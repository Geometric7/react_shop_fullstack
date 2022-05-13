import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';

import clsx from 'clsx';
import { NavBar } from '../NavBar/NavBar';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <NavBar/>
    {children}
  </div>
);
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
