import { Link } from 'react-router-dom';

const styles = {
  textAlign: 'center',
  minHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const NotFound = () => {
  return (
    // @ts-ignore
    <div className="container" style={styles}>
      <h2 style={{ marginBottom: '30px' }}>Oops! Page not found</h2>
      <Link to="/" className="button" type="button">
        Go back!
      </Link>
    </div>
  );
};
