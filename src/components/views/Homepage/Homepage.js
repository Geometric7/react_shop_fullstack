import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { HeadButtons } from '../../features/HeadButtons/HeadButtons';

import clsx from 'clsx';
import styles from './Homepage.module.scss';
import ringImage1 from '../../images/PopHome/pop_rings_1.jpg';
import ringImage2 from '../../images/PopHome/pop_rings_2.jpg';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Flare from '@material-ui/icons/Flare';

import { connect } from 'react-redux';
import { getCategories } from '../../../redux/categoriesRedux';

const Component = ({className, categories, children}) => (
  <Container className={clsx(className, styles.root)}>
    <Divider variant="middle" className={styles.divider} />
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
      <Grid item xs={12} sm={6}>
        <img className={styles.leftImage} src={ringImage1} alt="ring"/>
      </Grid>
      <Grid item xs={12} sm={6}
        className={styles.TextBox}>
        <img className={styles.image} src={ringImage2} alt="ring2"/>
        <h2 className={styles.Maintext}>Test text 1 <Flare className={styles.flare}/></h2>
        <h3 className={styles.Subtext}>test text 2 </h3>
      </Grid>
    </Grid>
    <Divider variant="middle" className={styles.divider} />
    <HeadButtons categories={categories}/>
    <Divider variant="middle" className={styles.divider} />
  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  categories: PropTypes.array,
};

const mapStateToProps = state => ({
  categories: getCategories(state),
});

const ContainerComponent = connect(mapStateToProps)(Component);

export {
  ContainerComponent as Homepage,
  Component as HomepageComponent,
};
