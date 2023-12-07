import ContentLoader from 'react-content-loader';

export const PizzaBlockSkeleton = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="130" r="120" />
      <rect x="132" y="274" rx="0" ry="0" width="0" height="1" />
      <rect x="5" y="264" rx="5" ry="5" width="270" height="24" />
      <rect x="5" y="306" rx="5" ry="5" width="270" height="84" />
      <rect x="150" y="402" rx="5" ry="5" width="120" height="43" />
      <rect x="5" y="410" rx="5" ry="5" width="120" height="26" />
    </ContentLoader>
  );
};
