import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// Pure React Helmet-based head. Pass title/description when needed.
const Head = ({ title, description, image, siteUrl, twitterUsername }) => {
  const seo = {
    title: title || 'Portfolio',
    description: description || 'Personal portfolio',
    image: image || '/favicon.png',
    url: siteUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    twitterUsername: twitterUsername || '',
  };

  return (
    <Helmet title={seo.title}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitterUsername && <meta name="twitter:creator" content={seo.twitterUsername} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  siteUrl: PropTypes.string,
  twitterUsername: PropTypes.string,
};

export default Head;
