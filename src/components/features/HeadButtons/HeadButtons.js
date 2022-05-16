import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './HeadButtons.module.scss';
import { Grid } from '@material-ui/core';
//import { connect } from 'react-redux';
//import { getAll, fetchPublished } from '../../../redux/ringsRedux';




const Component = ({className, rings}) => (
  <div className={clsx(className, styles.root)}>
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <NavLink exact to={`/products/${rings[1].category}`} className={styles.link}>
        <Grid item sm={12} className={styles.Box}>
          <img src={rings[1].categoryImg} alt={rings[1].category} className={styles.imageButton}/>
          <p className={styles.textButton}>{rings[1].categoryName}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${rings[2].category}`} className={styles.link}>
        <Grid item sm={12} className={styles.Box}>
          <img src={rings[2].categoryImg} alt={rings[2].category} className={styles.imageButton}/>
          <p className={styles.textButton}>{rings[2].categoryName}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${rings[3].category}`} className={styles.link}>
        <Grid item sm={12} className={styles.Box}>
          <img src={rings[3].categoryImg} alt={rings[3].category} className={styles.imageButton}/>
          <p className={styles.textButton}>{rings[3].categoryName}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${rings[0].category}`} className={styles.firstLink}>
        <Grid item sm={12} className={styles.Box}>
          <img src={rings[0].categoryImg} alt={rings[0].category} className={styles.imageButton}/>
          <p className={styles.textButton}>{rings[0].categoryName}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${rings[4].category}`} className={styles.link}>
        <Grid item sm={12} className={styles.Box}>
          <img src={rings[4].categoryImg} alt={rings[4].category} className={styles.imageButton}/>
          <p className={styles.textButton}>{rings[4].categoryName}</p>
        </Grid>
      </NavLink>
    </Grid>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  rings: PropTypes.array,
};

export {
  Component as HeadButtons,
  Component as HeadButtonsComponent,
};
