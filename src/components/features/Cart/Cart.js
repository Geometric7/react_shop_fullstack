import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import styles from './Cart.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Component = ({ cart, total }) => {
  const [opened, setOpened] = useState(false);
  const handleClick = e => {
    setOpened(!opened);
  };

  return (
    <div>
      <div className={styles.cartlink}>
        <Button
          className={styles.shop}
          color="inherit"
          endIcon={<ShoppingCart />}
          onClick={(e) => handleClick(e)}
        >
        </Button>
        <span>
          {total}$
        </span>
      </div>
      {opened ? (
        <div className={`${styles.root} ${opened ? styles.expanded : ''}`}>
          <div onClick={(e) => handleClick(e)} className={`${styles.background}`}></div>
          <div className={`${styles.cart}`}>
            <div className={styles.items}>
              {cart.rings.length ? (cart.rings.map(ring => (
                <CartItem id={ring._id} key={ring._id} />
              ))) :
                (
                  <small className={styles.noProducts}>
                    <p>You have no items in your cart</p>
                  </small>
                )
              }
            </div>
            <div className={styles.summary}>
              <p>
                Order summary
              </p>
              <div>
                <span>Amount:</span>
                <span>{countProductsInCart(cart.rings)}</span>
              </div>
              <div>
                <span>Value: </span>
                <span>{total} $</span>
              </div>
              <NavLink className={styles.linkContinue} exact to="/order">
                <Button
                  className={styles.button}
                  variant="contained"
                  disabled={cart.rings.length ? false : true} onClick={(e) => handleClick(e)}>
                  GO TO CART
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  total: PropTypes.number,
  expanded: PropTypes.bool,
  ring: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};
