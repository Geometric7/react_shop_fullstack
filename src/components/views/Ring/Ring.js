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
import { getRingByVariant } from '../../../redux/ringsRedux';
import { getVariantsByProducts } from '../../../redux/variantRedux';
import { addToCart } from '../../../redux/cartRedux';
import styles from './Ring.module.scss';

const Component = ({ ring, variants, className}) => {
  const [value, setValue] = React.useState('female');
  const [amount, setAmount] = React.useState(1);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const updateTextField = (event) => {
    setAmount(parseInt(event.target.value));
  };

  return (
    <Container className={clsx(className, styles.root)}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography component="p">Price {ring.price}$</Typography>
          <Typography component="h1">{ring.variant}</Typography>
          <Typography component="p"> {ring.description}</Typography>
          <FormControl component="fieldset"
            className={styles.select}>
            <FormLabel component="legend">{ring.productSelect}</FormLabel>
            <RadioGroup aria-label={ring.productSelect}
              name="select"
              value={value}
              onChange={handleChange}>
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
              onChange={updateTextField}
            />
          </span>
          <Button
            className={styles.button}
            variant="contained"
            onClick={() => addToCart(ring, amount)}>Add to Card</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PickMode variants={variants}/>
        </Grid>
      </Grid>
    </Container>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  ring: PropTypes.object,
  variants: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  ring: getRingByVariant(state,  props.match.params.id),
  variants: getVariantsByProducts(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  addToCart: (ring, amount) => dispatch(addToCart(ring, amount)),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ContainerComponent as Ring,
  Component as RingComponent,
};
