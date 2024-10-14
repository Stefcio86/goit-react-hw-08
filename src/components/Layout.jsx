// eslint-disable-next-line no-unused-vars
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
