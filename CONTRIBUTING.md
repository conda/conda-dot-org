[conda-dot-org]: https://conda.org
[github-forking-how-to]: https://docs.github.com/en/get-started/quickstart/fork-a-repo
[installing-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[installing-npm]: https://nodejs.org/en/download/
[pro-git]: https://git-scm.com/book/en/v2
[conda-dot-org-repo]: https://github.com/conda-incubator/conda-dot-org
[vscode-download]: https://code.visualstudio.com/?wt.mc_id=vscom_downloads
[sublimetext-download]: https://www.sublimetext.com/3
[atom-download]: https://atom.io/
[docusaurus]: https://docusaurus.io/
[markdown-guide]: https://www.markdownguide.org/
[issue-board]: https://github.com/orgs/conda-incubator/projects/3
[ssh-key-instructions]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
[adding-ssh-key]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
[github-cli]: https://cli.github.com/
[github-desktop]: https://desktop.github.com/
[docusaurus-blog-docs]: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#markdown-front-matter

# Contributing

Welcome to the [conda.org][conda-dot-org] contributing guide! In this guide, you will find everything you need
to get up and running as a contributor to [conda.org][conda-dot-org]. This is a contributing guide
for two kinds of contributors:

- **Content contributors**
    - Contributors writing content for the website, which can include news and blog posts.
- **Technical contributors**
    - Contributors writing HTML, CSS, or Javascript for the website that modifies the way 
      it looks or behaves.

In this guide, we start off by explaining contribution steps that apply
to both kinds of contributors. Then, the guide branches off to explain specifics for each.

## General guidelines for content on [conda.org][conda-dot-org]

[conda.org][conda-dot-org] is a website that represents the entire conda community. To make sure that not any one project, company, or organization
gets preferential treatment, we have defined the following guidelines to follow when contributing new content and updating
existing content:

- Content not present in the blog should speak of the wider ecosystem and not prioritize any particular tool, channel, company, or organization.
- The blog is an area where particular tools, channels, companies, or organizations may be promoted.

## Documentation tools

[conda.org][conda-dot-org] is built with [Docusaurus 2][docusaurus], a modern static website generator that 
uses a friendly Markdown format to create the website copy. If you are not familiar with 
Markdown, check out the [Markdown Guide project][markdown-guide].

## Working on issues

The conda.org project has an [issue board][issue-board] from which contributors 
can choose issues. If there is an aspect of the website that you feel needs work, please 
create a new issue using the **Add item** button at the bottom of the appropriate column.

For new contributors, please look for issues which have the https://github.com/conda-incubator/conda-dot-org/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
label. If you want to work on an issue, please leave a comment saying so. The first person
to comment on the issue will be assigned. If they are unable to work on it for any reason,
the second person who comments on it will be assigned, and so on.

## Github flow

### Prerequisites

To follow this guide, you will need to have these programs installed on your computer:

- git: [installation link][installing-git]

It is also highly encouraged that you at least have a basic understanding of how to use
git at the command line. If you do not, please check out the book [Pro Git][pro-git],
available for free from the official git website. [GitHub CLI][github-cli] can also be
a very useful tool, especially for contributors utilizing Windows machines for development work.

> **Note**
> For contributors who would prefer to use GitHub wrapped in a UI, [GitHub Desktop][github-desktop]
> is recommended.

### Github flow

#### 1. Creating a fork

The very first step to contributing is creating your own fork of the 
[conda-dot-org repository][conda-dot-org-repo]. If you have never done this before, 
we strongly encourage you to read the 
[Fork a repo][github-forking-how-to] guide from GitHub first.

#### 2. Clone your repository

After you have created your fork, you are ready to clone this repository to your 
local computer, where you can begin making edits. The commands for doing so will 
be different depending on your user name, but a typical example is shown below:

```
$ git clone git@github.com:username/conda-dot-org.git
```

> **Note**
> If you have not configured your GitHub account to authenticate your computer via
> SSH key, make sure to [generate an SSH key][ssh-key-instructions] and then
> [add it to your GitHub account][adding-ssh-key] before running the command above.

#### 3. Move to your newly-cloned directory

Use the `cd` command to change your directory. Consider the following directory structure:

```
├── Users
│   ├── jdoe *You are here
│   │   ├── conda-dot-org
```

When you first open a CLI, it usually opens in your home directory. You
can use `cd`, followed by a file path, to properly change your directory.

```
$ cd conda-dot-org
```

#### 3. Creating a new branch

Once you have cloned this repository, you now need to create a branch that will hold the
work you are planning to contribute. You can do that with the following command:

```
$ git checkout -b my-new-contribution
```

Name the branch something related to the work you are doing. If you're working from
an issue on our issue board, consider adding the issue number to the branch name.
This can make it easier to find your work again later. For example:

```
$ git checkout -b 112-home-page-improvements
```

#### 4. Making edits and committing your changes

Running the clone command (see step two) creates a copy of the repo in your file system. 
You can then use a code editor of your choice (such as [VSCode][vscode-download], 
[SublimeText][sublimetext-download], or [Atom][atom-download]) to make changes to the files.

As you're working, you can view your changes locally using the instructions in the 
[Setting up a local version of the site](#setting-up-a-local-version-of-the-site) section.

Once you have made the necessary edits, you can commit these edits by running the 
following commands. Here, we assume that I have added a new file called "article.md" 
to the repository:

```
$ git add article.md 
$ git commit -m "adding my new article"
```

#### 5. Pushing your changes to GitHub

Once that runs, you can "push" these changes to GitHub.

The first time you push your changes, you will need to specify your upstream branch 
by running the following command:

```
git push --set-upstream origin my-new-contribution
```
> **Note**
> Any further push commands will only need to be `git push`.

The output of your first push command always includes a link you can use to open a 
pull request. Click this link to open a pull request against the main 
branch in the conda-dot-org repository. On the pull request creation form, always
be sure that the "base" branch is the "main" branch for conda-dot-org.

That completes the entire workflow for submitting new changes. After you submit your pull
request, we will try our best to review it in a timely manner. If you need to make any more
edits or changes based on these reviews, repeat steps four and five (but using ```git push```
only to push any more changes).

## Setting up a local version of the site

The above steps are great for adding your changes to git and submitting them for review,
but what if you want to preview exactly what your changes will look like on the website?
The answer to this involves running a local version of the website that automatically 
updates as you change and add files on your computer. Below, we will walk through the
steps necessary to do just that.

### Prerequisites

- npm: [installation link][installing-npm]

NPM (Node Package Manager) is a program used for installing Javascript dependencies on your
computer. To follow this guide, it is not necessary that you know Javascript, but you will 
need to be comfortable with running a couple different commands in your command line 
interface (CLI) that will install these dependencies and then run the server locally.

> **Note**
> After installing `npm`, you will need to restart your terminal.

### Installing NPM dependencies

Provided that you have already forked and cloned the repository (see above), the first step 
is installing all the necessary dependencies.

If you aren't in the conda-dot-org repository folder, use the `cd` command to change your directory.

```
cd conda-dot-org
```

Then, use the following command to install your dependencies:

```
npm install 
```

After this command finishes, you can run the following command to get the website running
locally:

```
npm run start
```

That's it! Every time you make edits, the website will dynamically reload, showing your
new updates/additions. See something that doesn't quite look right or is not showing
up how you expect? Be sure to check the error log in the terminal for any information 
that can help you.

## Content contributors

### Creating a blog post

Blog posts must be created in the `blog` directory with a file naming convention 
of `YYYY-MM-DD-title.md`. 

Let's say you're announcing a cool new project you've recently released. Your file would be 
named something like `2023-04-22-cool-project-v1-release.md`.

conda.org blog posts support the following metadata:

```
title: The title of your blog.
description: A brief description of your blog's topic.
slug: The name of your blog page within the conda.org url.
authors: The author(s) of the blog, including their name(s), title(s), website link(s), and author image(s)
tags: Tags to group your blog with others and enable better filtering and browsing (e.g. conda, release, package, announcement).
image: Cover or thumbnail image for your blog display.
```

Consider the following "Cool Project" example. Its file will begin with the following metadata, set off 
with three dashes, followed by the actual blog text.

```
---
title: Cool Project V1 Released!
description: The release of Cool Project version 1
slug: cool-project-v1-release
authors:
  - name: John Doe
    title: Creator of Cool Project
    url: https://github.com/JohnDoe
    image_url: https://github.com/JohnDoe.png
tags: [release, announcement]
image: https://github.com/blog-image.png
---

We are pleased to announce the release of Cool Project Version 1.

The project contains the following cool things:
...
```

See [the Docusaurus blog frontmatter documentation](docusaurus-blog-docs) for more information 
on your blog creation options.

#### Storing and using images

If your blog post has images, please put them in the following folder: `static/img/blog/<blog-file-name>/`
where `<blog-file-name>` is the same name as the initial blog post (e.g. `static/img/blog/2023-04-22-cool-project-v1-release/`).

To use these images in your blog post, make sure to first create the blog as a `*.mdx` file and then
import it at the top of the file. You should also used the included image plugin that Docusaurus makes
available. An example of this is shown below:

```javascript
import Image from '@theme/IdealImage';
import bannerImage from '@site/static/img/blog/2023-04-22-cool-project-v1-release/banner-image.png';

<Image img={bannerImage} />
```

## Technical contributors

*Coming soon! We are still figuring out exactly how this will look*
