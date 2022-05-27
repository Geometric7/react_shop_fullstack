/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './NotFound.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <h1>404 Page not found</h1>
    <img src="https://cdn.dribbble.com/users/1484654/screenshots/12124455/media/767417328eeb9e14c1cb40c69e323591.png?compress=1&resize=400x300" alt="no404"></img>
    <div className={styles.button}>
      <a href={`${process.env.PUBLIC_URL}/`} > Back to Homepage</a>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
