import React from 'react';
import styles from './PopUp.module.scss';
import PropTypes from 'prop-types';

const Component = ({ option = '', children, ...otherProps }) => (
  <div
    {...otherProps}
    className={styles.component + option.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
  >
    {children}
  </div>
);

Component.propTypes = {
  option: PropTypes.string,
  children: PropTypes.node,
};

export {
  Component as PopUp,
  Component as PopUpComponent,
};
