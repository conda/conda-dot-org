import React from "react";
import Image from "@theme/IdealImage";
// starting 3.5.0 blog internals have moved to the plugin
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";

export default function BlogPostItemHeaderBanner() {
  const { metadata } = useBlogPost();
  const { frontMatter } = metadata;
  const { image, image_credit, title } = frontMatter;

  const ImageCredit = ({ image_credit }) => (
    <p>
      <i>
        <small>
          Image credit:{" "}
          <span dangerouslySetInnerHTML={{ __html: image_credit }} />
        </small>
      </i>
    </p>
  );

  return (
    <div>
      {image && (
        <Image
          img={require(`@site/static/${image}`)}
          alt={`Banner image for ${title} blog post`}
        />
      )}
      {image && image_credit && <ImageCredit image_credit={image_credit} />}
    </div>
  );
}
