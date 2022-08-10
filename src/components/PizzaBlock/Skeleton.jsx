import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="120" r="120" />
    <rect x="0" y="300" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="408" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="398" rx="20" ry="20" width="152" height="45" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="20" />
  </ContentLoader>
);

export default Skeleton;
