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
import { InputMode } from '../../common/InputMode/InputMode';
import { PickMode } from '../../features/PickMode/PickMode';
import { connect } from 'react-redux';
import { getRingByVariant, fetchPublished } from '../../../redux/ringsRedux';
import { getVariantsByProducts, loadVariantsRequest } from '../../../redux/variantRedux';
import { addToCart } from '../../../redux/cartRedux';
import styles from './Ring.module.scss';

class Component extends React.Component {
  state= {
    value: '',
    amount: 1,
  };
  static propTypes = {
    className: PropTypes.string,
    ring: PropTypes.object,
    variants: PropTypes.array,
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
    this.setState({value: event.target.value});
  };

  updateTextField = (event) => {
    this.setState({amount: parseInt(event.target.value)});
  };

  addRingToCart = (amount, value) => this.props.addRing({
    ring: this.props.ring,
    amount: amount,
    value: value });

  render() {
    const { ring, variants, className} = this.props;
    const { amount, value } = this.state;

    return (
      <Container className={clsx(className, styles.root)}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography component="p">Price {ring.price}$</Typography>
            <Typography component="h1">{ring.option}</Typography>
            <Typography component="p"> {ring.description}</Typography>
            <FormControl component="fieldset"
              className={styles.select}>
              <FormLabel component="legend">{ring.productSelect}</FormLabel>
              <RadioGroup aria-label={ring.productSelect}
                name="select"
                value={value}
                onChange={this.handleChange}>
                {variants.map( variant => (
                  <FormControlLabel
                    key={variant.variant}
                    value={variant.variant}
                    control=
                      {<Radio
                        className={styles.radio}
                        style= {{color: '#947EC3'}} />}
                    label={variant.variant} />
                ))}
              </RadioGroup>
            </FormControl>
            <span>Amount:&nbsp;
              <InputMode
                value={amount}
                onChange={this.updateTextField}
              />
            </span>
            <Button
              className={styles.button}
              variant="contained"
              onClick={() => this.addRingToCart( amount, value )}>
                Add to Cart
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputMode options={variants}/>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ring: getRingByVariant(state,  props.match.params.id),
  variants: getVariantsByProducts(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  addRing: (arg) => dispatch(addToCart(arg)),
  loadProducts: () => dispatch(fetchPublished()),
  loadVariantsRequest: () => dispatch(loadVariantsRequest()),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ContainerComponent as Ring,
  Component as RingComponent,
};
