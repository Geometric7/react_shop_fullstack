import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';

import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import { NavBar } from '../NavBar/NavBar';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <NavBar/>
    <Divider variant="middle" />
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
