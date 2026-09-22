import React from "react";
import PropTypes from "prop-types";
import Image from "@theme/IdealImage";
// starting 3.5.0 blog internals have moved to the plugin
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";

function ImageCredit({ image_credit }) {
  return (
    <p>
      <i>
        <small>
          Image credit:{" "}
          <span dangerouslySetInnerHTML={{ __html: image_credit }} />
        </small>
      </i>
    </p>
  );
}

ImageCredit.propTypes = {
  image_credit: PropTypes.string.isRequired,
};

export default function BlogPostItemHeaderBanner() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { frontMatter } = metadata;
  const { image, image_credit, title } = frontMatter;

  return (
    <div>
      {image && (
        <Image
          img={require(`@site/static/${image}`)}
          alt={`Banner image for ${title} blog post`}
        />
      )}
      {isBlogPostPage && image && image_credit && (
        <ImageCredit image_credit={image_credit} />
      )}
    </div>
  );
}
