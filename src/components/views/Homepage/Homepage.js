import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { HeadButtons } from '../../features/HeadButtons/HeadButtons';

import clsx from 'clsx';
import styles from './Homepage.module.scss';
import ringImage1 from '../../images/PopHome/pop_rings_5.jpg';
import ringImage2 from '../../images/PopHome/pop_rings_2.jpg';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Flare from '@material-ui/icons/Flare';

//import { connect } from 'react-redux';
//import { getAll } from '../../../redux/ringsRedux';
//import { fetchPublished } from '../../../redux/ringsRedux';

class Component extends React.Component {
  //componentDidMount() {
  //  const { loadProduct } = this.props;
  //  loadProduct();
  //}
  render() {
    const { className } = this.props;
    return (
      <Container className={clsx(className, styles.root)}>
        <Divider variant="middle" className={styles.divider} />
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center">
          <Grid item xs={12} sm={6}>
            <img className={styles.leftImage} src={ringImage1} alt="ring1" />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.TextBox}>
            <img className={styles.image} src={ringImage2} alt="ring2" />
            <h2 className={styles.Maintext}>
              Test rings text



            </h2>
            <h3 className={styles.Subtext}>Test ring text2 </h3>
          </Grid>
        </Grid>

        <Divider variant="middle" className={styles.divider} />
        <HeadButtons />
        <Divider variant="middle" className={styles.divider} />
      </Container>
    );
  }
}

Component.propTypes = {
  //rings: PropTypes.array,
  className: PropTypes.string,
  loadProduct: PropTypes.func,
};

//const mapStateToProps = (state) => ({
//rings: getAll(state),
//});

//const mapDispatchToProps = (dispatch) => ({
//loadProduct: () => dispatch(fetchPublished()),
//});

//const ContainerComponent = connect(
//mapStateToProps,
//mapDispatchToProps
//)(Component);

export {
  //ContainerComponent as Homepage,
  Component as HomepageComponent,
  Component as Homepage,
};
