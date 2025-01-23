// Usage: npm run index-blog -- --help

const { readdirSync, readFileSync, writeFileSync, statSync } = require("fs");
const { join, basename, extname } = require("path");
const { generateBanner } = require("banner");
const YAML = require("yaml");
const { program } = require("commander");

// Directory settings
const BLOGS_DIR = join(__dirname, "..", "..", "blog");
const NEWS_FILE = join(BLOGS_DIR, "news.json");
const STATIC_DIR = join(__dirname, "..", "..", "static");
const BLOG_IMGS_DIR = join(STATIC_DIR, "img", "blog");

// Regex pattern to match blog post titles
const BLOG_TITLE_PATTERN = /((\d{4}-\d{2}-\d{2}).+)/;

// Function to get the index file of a directory or the file itself
function getIndex(path) {
  if (statSync(path).isFile()) return path;
  const mdPath = join(path, "index.md");
  if (statSync(mdPath).isFile()) return mdPath;
  const mdxPath = join(path, "index.mdx");
  if (statSync(mdxPath).isFile()) return mdxPath;
  return null;
}

// Function to extract the date and slug from the blog post directory or filename
function getDateSlug(path) {
  const match = BLOG_TITLE_PATTERN.exec(basename(path, extname(path)));
  if (!match) return null;
  return [new Date(match[2]), match[1]];
}

// Function to get the most recent blog entries
function getBlogFiles(directory) {
  return readdirSync(directory)
    .map((filename) => {
      const index = getIndex(join(directory, filename));
      const dateSlug = getDateSlug(filename);
      if (index && dateSlug) return [...dateSlug, index];
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b[0] - a[0]); // Sort by date in descending order
}

// Function to create a banner for a blog post
function createBanner(slug) {
  const path = join("img", "blog", slug, "banner.png");
  generateBanner(join(STATIC_DIR, path));
  return path;
}

// Function to serialize the frontmatter
function serializeFrontmatter(metadata) {
  // We want all sequences to be in flow style but all other collections in block style
  const doc = new YAML.Document(metadata);

  // Visit all nodes and apply transformations
  YAML.visit(doc, {
    Map(_, node) {
      // Set the Map to block style
      node.flow = false;
    },
    Seq(_, node) {
      // Set the Seq to flow style
      node.flow = true;
    },
  });

  return doc.toString().trim();
}

// Function to update the frontmatter of the blog entries
function updateMetadata(directory = BLOGS_DIR, verbose = false) {
  const metadata = [];
  const blogFiles = getBlogFiles(directory);

  blogFiles.forEach(([date, slug, indexPath]) => {
    const fileContent = readFileSync(indexPath, "utf8").split("---");

    if (fileContent.length <= 1) return;

    // Parse the YAML frontmatter
    const yamlFrontmatter = fileContent[1].trim();
    const metadataObj = YAML.parse(yamlFrontmatter);

    if (!metadataObj) return;

    // Update the frontmatter metadata
    metadataObj.slug = slug;
    if (!metadataObj.image) {
      metadataObj.image = createBanner(slug);
    }

    // Write updated frontmatter back to the file
    const newFrontmatter = serializeFrontmatter(metadataObj);
    const updatedContent = `---\n${newFrontmatter}\n---\n\n${fileContent.slice(2).join("---").trim()}\n`;
    writeFileSync(indexPath, updatedContent, "utf8");

    // Push the metadata to the list
    metadata.push({ ...metadataObj, date: date.toISOString() });
  });

  return metadata;
}

function indexBlog(directory = BLOGS_DIR, path = NEWS_FILE, verbose = false) {
  const metadata = updateMetadata(directory, verbose);
  writeFileSync(path, JSON.stringify(metadata.slice(0, 5), null, 2), "utf8");
}

function main() {
  program
    .name("index-blog")
    .version("0.1.0")
    .description(
      "A small tool to index blog posts and ensure the frontmatters are up-to-date.",
    )
    .option("-b, --blog <directory>", "Specify the blog directory", BLOGS_DIR)
    .option("-n, --news <filename>", "Specify the news file", NEWS_FILE)
    .option("-v, --verbose", "Enable verbose mode")
    .option("--ignore-modified [paths...]", "Consume all remaining arguments")
    .parse();
  const options = program.opts();

  indexBlog(options.blog, options.verbose, options.news);
}

if (require.main === module) main();

module.exports = { indexBlog };
