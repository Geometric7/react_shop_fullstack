import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { getRingByOption, fetchPublished } from '../../../redux/ringsRedux';
import { getOptionsByProducts, loadOptionsRequest } from '../../../redux/optionRedux';
import { addToCart } from '../../../redux/cartRedux';
import styles from './Ring.module.scss';
import { InputMode } from '../../common/InputMode/InputMode';
import { PickMode } from '../../features/PickMode/PickMode';

class Component extends React.Component {
  state = {
    value: '',
    amount: 1,
    rate: this.props.ring.rate,
  };

  static propTypes = {
    className: PropTypes.string,
    ring: PropTypes.object,
    options: PropTypes.array,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    addRing: PropTypes.func,
    addToCart: PropTypes.func,
    loadProducts: PropTypes.func,
    loadOptionsRequest: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadOptionsRequest();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleRate = (event) => {
    this.setState({ rate: event.target.value || this.props.ring.rate});
  };

  updateTextField = (event) => {
    this.setState({ amount: parseInt(event.target.value) });
  };

  addRingToCart = (amount, value) =>
    this.props.addRing({
      ring: this.props.ring,
      amount: amount,
      value: value,
    });

  render() {
    const { ring, options, className } = this.props;
    const { amount, value, rate } = this.state;

    return (

      <Container className={clsx(className, styles.root)}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Typography component="p">Price {ring.price}$</Typography>
            <Typography component="h1">{ring.option}</Typography>
            <Typography component="p"> {ring.description}</Typography>
            {ring ?
              (<Box
                component="fieldset"
                mb={3}
                borderColor="transparent"
                className={styles.rate}
              >
                <Typography component="legend">Client rate</Typography>
                <Rating
                  name="Product rate"
                  value={rate}
                  onChange={this.handleRate}
                />
              </Box>) : null}
            <FormControl component="fieldset" className={styles.select}>
              <FormLabel component="legend">{ring.productSelect}</FormLabel>
              <RadioGroup
                aria-label={ring.productSelect}
                name="PickMode"
                value={value}
                onChange={this.handleChange}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.option}
                    value={option.option}
                    control={
                      <Radio
                        className={styles.radio}
                        style={{ color: '#947EC3' }}
                      />
                    }
                    label={option.option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <span>
              Amount:&nbsp;
              <InputMode value={amount} onChange={this.updateTextField} />
            </span>
            <Button
              className={styles.button}
              option="contained"
              onClick={() => this.addRingToCart(amount, value)}
            >
              Add to cart
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {options.length ?
              (<PickMode options={options} />) : null}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ring: getRingByOption(state, props.match.params.id),
  options: getOptionsByProducts(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addRing: (arg) => dispatch(addToCart(arg)),
  loadProducts: () => dispatch(fetchPublished()),
  loadOptionsRequest: () => dispatch(loadOptionsRequest()),
});

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export {
  ContainerComponent as Ring,
  Component as RingComponent,
};
