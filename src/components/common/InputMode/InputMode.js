import React from 'react';
import styles from './InputMode.module.scss';
import PropTypes from 'prop-types';

const Component = ({ value, onChange }) => (
  <input
    type="number"
    min="1"
    max="100"
    value={value}
    onChange={onChange}
    className={styles.component}
  />
);

Component.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export {
  Component as InputMode,
  Component as InputModeComponent,
};
