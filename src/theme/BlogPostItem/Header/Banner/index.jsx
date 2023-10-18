import React from 'react';
import Image from '@theme/IdealImage';
import { useBlogPost } from '@docusaurus/theme-common/internal';

export default function BlogPostItemHeaderBanner() {
  const { metadata } = useBlogPost();
  const { frontMatter } = metadata;
  const { image, image_credit, title } = frontMatter;

  const ImageCredit = ({ image_credit }) => (
    <p>
      <i>
        <small>
          Image credit: <span dangerouslySetInnerHTML={{ __html: image_credit }} />
        </small>
      </i>
    </p>
  );

  return (
    <div>
      {image && (<Image img={require(`@site/static/${image}`)} alt={`Banner image for ${title} blog post`} />)}
      {image && image_credit && (<ImageCredit image_credit={image_credit} />)}
    </div>
  );
}
