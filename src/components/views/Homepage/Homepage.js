import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import clsx from 'clsx';
import styles from './Homepage.module.scss';
import ringImage1 from '../../images/PopHome/pop_rings_1.jpg';
import ringImage2 from '../../images/PopHome/pop_rings_2.jpg';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Flare from '@material-ui/icons/Flare';

const Component = ({className}) => (
  <Container className={clsx(className, styles.root)}>
    <Divider variant="middle" />
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center">
      <Grid item xs={12} sm={7}>
        <img src={ringImage1} alt="ring"/>
      </Grid>
      <Grid item xs={12} sm={5}
        className={styles.TextBox}>
        <img className={styles.image} src={ringImage2} alt="ring2"/>
        <h2 className={styles.Maintext}>Test text 1 <Flare className={styles.flare}/></h2>
        <h3 className={styles.Subtext}>test text 2 </h3>
      </Grid>
    </Grid>
    <Divider variant="middle" />
  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
