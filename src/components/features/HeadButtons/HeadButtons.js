import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './HeadButtons.module.scss';
import { Grid } from '@material-ui/core';


const Component = ({className, categories}) => (
  <div className={clsx(className, styles.root)}>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center">
      <NavLink exact to={`/products/${categories[1].id}`} className={styles.firstLink}>
        <Grid item xs={12} sm={12} className={styles.Box}>
          <img src={categories[1].image} alt={categories[1].id} className={styles.imageButton}/>
          <p className={styles.textButton}>{categories[1].name}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${categories[2].id}`} className={styles.link}>
        <Grid item xs={12} sm={12} className={styles.Box}>
          <img src={categories[2].image} alt={categories[2].id} className={styles.imageButton}/>
          <p className={styles.textButton}>{categories[2].name}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${categories[3].id}`} className={styles.link}>
        <Grid item xs={12} sm={12} className={styles.Box}>
          <img src={categories[3].image} alt={categories[3].id} className={styles.imageButton}/>
          <p className={styles.textButton}>{categories[3].name}</p>
        </Grid>
      </NavLink>
      <NavLink exact to={`/products/${categories[0].id}`} className={styles.link}>
        <Grid item xs={12} sm={12} className={styles.Box}>
          <img src={categories[0].image} alt={categories[0].id} className={styles.imageButton}/>
          <p className={styles.textButton}>{categories[0].name}</p>
        </Grid>
      </NavLink>
    </Grid>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  categories: PropTypes.array,
};

export {
  Component as HeadButtons,
  Component as HeadButtonsComponent,
};
