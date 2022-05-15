import React from 'react';
import PropTypes from 'prop-types';
import { CartItem } from '../../features/CartItem/CartItem';
import { PopUp } from '../../features/PopUp/PopUp';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import { OrderForm } from '../../features/OrderForm/OrderForm';
import { delayDisconnect } from '../../../_HOcomponents/delayDisconnect/delayDisconnect';

const Component = ({ cart, total }) => {
  const DelayedPopUp = delayDisconnect(PopUp);
  return (
    <div className={styles.wrapper}>
      {!cart.rings.length ? (
        <DelayedPopUp variant="danger">Add product to your cart</DelayedPopUp>
      ) : null}
      <h2 className={styles.header}>My products</h2>
      <div className={styles.items}>
        {cart.rings.length ? (
          cart.rings.map((ring) =>
            <CartItem key={ring._id} id={ring._id} />)
        ) : (
          <small className={styles.noProducts}>
            <i>Your cartRedux is empty</i>
          </small>
        )}
      </div>
      <NavLink className={styles.link} exact to="/">
        Add more!
      </NavLink>
      <h2>Order Summary</h2>
      <div className={styles.summary}>
        <span>Product list: </span>
        <span>{countProductsInCart(cart.rings)}</span>
      </div>
      <div className={styles.summary}>
        <span>Order: </span>
        <span>{total}$</span>
      </div>
      <h2>Contact info</h2>
      <OrderForm />
    </div>
  );
};
Component.propTypes = {
  cart: PropTypes.object,
  total: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const Container = connect(mapStateToProps, null)(Component);

export { Container as OrderSummary, Component as OrderSummaryComponent };
