/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { getCart, loadCartRequest, saveCartRequest } from '../../redux/cartRedux';
import { compose } from 'redux';
import { connect } from 'react-redux';

export function cartStorage(Component) {
  return class extends React.Component {
    static propTypes = {
      loadCart: PropTypes.func,
      saveCart: PropTypes.func,
      cart: PropTypes.object,
    };
    componentDidMount() {
      this.props.loadCart();
    }
    shouldComponentUpdate(prevState) {
      return prevState.cart !== this.props.cart;
    }
    componentDidUpdate() {
      this.props.saveCart(this.props.cart.rings);
    }
    render() {
      return (
        <Component {...this.props} />
      );
    }
  };
}

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartRequest()),
  saveCart: data => dispatch(saveCartRequest(data)),
});

const cartStorageH = compose(
  connect(mapStateToProps, mapDispatchToProps), cartStorage
);

export default cartStorageH;
