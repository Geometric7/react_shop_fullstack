import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './Post.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Post placeholder</h2>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Post,
  Component as PostComponent,
};
