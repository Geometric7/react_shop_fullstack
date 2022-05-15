import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getCart, getTotalPrice, newOrderRequest } from '../../../redux/cartRedux.js';
import { delayDisconnect } from '../../../_HOcomponents/delayDisconnect/delayDisconnect';
import { PopUp } from '../PopUp/PopUp';
import { withRouter } from 'react-router-dom';
import styles from './OrderForm.module.scss';


class Component extends React.Component {

  state = {
    client: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      place: '',
      postCode: '',
    },
    error: null,
  };

  static propTypes = {
    cart: PropTypes.object,
    total: PropTypes.number,
    sendOrder: PropTypes.func,
    history: PropTypes.object,
  };

  submitOrder = (event, rings, total) => {
    const { firstName, lastName, email, address, place, postCode } = this.state.client;
    const { sendOrder } = this.props;
    event.preventDefault();

    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
    const validPostCode = /[0-9]{2}-[0-9]{3}/;

    let error = null;
    if (!firstName || !lastName || !email || !address || !place || !postCode) error = 'Fill in all required fields';
    else if (!rings.length) error = 'Your shoping basket is empty';
    else if (!total) error = 'Your shoping basket is empty';
    else if (!validEmail.test(email)) error = 'Invalid e-mail address';
    else if (!validAddress.test(address)) error = 'Invalid address';
    else if (!validPostCode.test(postCode)) error = 'Invalid post code';

    if (!error) {

      const productsData = rings.map(ring => (
        {
          _id: ring._id,
          amount: ring.amount,
          notes: ring.notes,
        }
      ));

      const payload = {
        rings: productsData,
        client: this.state.client,
        total: total,
      };
      sendOrder(payload);
      this.setState({
        client: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          place: '',
          postCode: '',
        },
        error: null,
      });
      this.props.history.push('/');

    } else {
      this.setState({ error });
    }
  };

  updateTextField = ({ target }) => {
    const { client } = this.state;
    const { value, name } = target;

    this.setState({ client: { ...client, [name]: value }, error: null });
  };

  render() {
    const DelayedPopup = delayDisconnect(PopUp);
    const { updateTextField, submitOrder } = this;
    const { client, error } = this.state;
    const { cart, total } = this.props;
    return (
      <div className={styles.root}>
        <form noValidate onSubmit={e => submitOrder(e, cart.rings, total)}>
          {error ? <DelayedPopup variant='danger'>{error}</DelayedPopup> : null}

          <Grid container>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="firstName">Name</label>
              <input
                className={styles.input}
                type="text"
                value={client.firstName}
                name="firstName"
                onChange={updateTextField}
                id="firstName"
              />
            </Grid>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="lastName">Surname</label>
              <input
                className={styles.input}
                type="text"
                value={client.lastName}
                name="lastName"
                onChange={updateTextField}
                id="lastName"
              />
            </Grid>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="email">E-mail</label>
              <input
                className={styles.input}
                type="text"
                value={client.email}
                name="email"
                onChange={updateTextField}
                id="email"
              />
            </Grid>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="address">Address</label>
              <input
                className={styles.input}
                type="text"
                value={client.address}
                name="address"
                onChange={updateTextField}
                id="address"
              />
            </Grid>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="place">Town</label>
              <input
                className={styles.input}
                type="text"
                value={client.place}
                name="place"
                onChange={updateTextField}
                id="place"
              />
            </Grid>
            <Grid
              className={styles.Box}
              item xs={12} md={6}>
              <label htmlFor="postCode">Post code</label>
              <input
                className={styles.input}
                type="text"
                value={client.postCode}
                name="postCode"
                onChange={updateTextField}
                id="postCode"
              />
            </Grid>
          </Grid>
          <Button
            className={styles.button}
            variant="contained"
            type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrder: data => dispatch(newOrderRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

export {
  Container as OrderForm,
  Component as OrderFormComponent,
};
