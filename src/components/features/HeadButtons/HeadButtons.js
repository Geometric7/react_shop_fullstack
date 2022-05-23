import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './HeadButtons.module.scss';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/ringsRedux';
import { NotFound } from '../../views/NotFound/NotFound';


class Component extends React.Component {
  componentDidMount() {
    const { loadProduct } = this.props;
    loadProduct();
  }
  render() {
    const { className, rings } = this.props;
    return (
      rings.length ? (
        <div className={clsx(className, styles.root)}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <NavLink exact to={`/products/${rings[0].category}`} className={styles.firstLink}>
              <Grid item sm={12} className={styles.Box}>
                <img src={rings[0].categoryImg} alt={rings[0].category} className={styles.imageButton}/>
                <p className={styles.textButton}>{rings[0].categoryName}</p>
              </Grid>
            </NavLink>
            <NavLink exact to={`/products/${rings[3].category}`} className={styles.link}>
              <Grid item sm={12} className={styles.Box}>
                <img src={rings[3].categoryImg} alt={rings[3].category} className={styles.imageButton}/>
                <p className={styles.textButton}>{rings[3].categoryName}</p>
              </Grid>
            </NavLink>
            <NavLink exact to={`/products/${rings[7].category}`} className={styles.link}>
              <Grid item sm={12} className={styles.Box}>
                <img src={rings[7].categoryImg} alt={rings[7].category} className={styles.imageButton}/>
                <p className={styles.textButton}>{rings[7].categoryName}</p>
              </Grid>
            </NavLink>
            <NavLink exact to={`/products/${rings[10].category}`} className={styles.link}>
              <Grid item sm={12} className={styles.Box}>
                <img src={rings[10].categoryImg} alt={rings[10].category} className={styles.imageButton}/>
                <p className={styles.textButton}>{rings[10].categoryName}</p>
              </Grid>
            </NavLink>
            <NavLink exact to={`/products/${rings[11].category}`} className={styles.link}>
              <Grid item sm={12} className={styles.Box}>
                <img src={rings[11].categoryImg} alt={rings[11].category} className={styles.imageButton}/>
                <p className={styles.textButton}>{rings[11].categoryName}</p>
              </Grid>
            </NavLink>

          </Grid>
        </div>) : (<div>
        <h2>Still Loading. Please Wait</h2>
      </div>)
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  rings: PropTypes.array,
  loadProduct: PropTypes.func,
};

const mapStateToProps = (state) => ({
  rings: getAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProduct: () => dispatch(fetchPublished()),
});

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export {
  ContainerComponent as HeadButtons,
  Component as HeadButtonsComponent,
};
