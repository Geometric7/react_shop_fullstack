import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { InputMode } from '../../common/InputMode/InputMode';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './CartItem.module.scss';
import { connect } from 'react-redux';
import { getProductFromCart, changeProductAmount, removeFromCart, addOrderNotes } from '../../../redux/cartRedux.js';
import EditIcon from '@material-ui/icons/Edit';

const Component = ({ ring, changeAmount, removeProduct, addNotes }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.root}>
      <div className={styles.productItem}>
        <div className={styles.image}>
          <img
            src={ring.image}
            alt={ring.name}
          />
        </div>
        <div className={styles.productData}>
          <div className={styles.productInfo}>
            <span>{ring.option}</span>
            <span>{ring.value}</span>
            <small>{ring.price}&nbsp;$</small>
          </div>
          <div>
            <small>Quantity:&nbsp;</small>
            <InputMode
              value={ring.amount}
              onChange={e => changeAmount({ id: ring._id, amount: parseInt(e.target.value) })}
            />
            <Button
              onClick={handleExpandClick}
              aria-label="add-notes"
              className={styles.icon}
            >
              <EditIcon style={{color: '#584332'}}/>
            </Button>
            <Button
              onClick={() => removeProduct(ring)}
              aria-label="delete"
              className={styles.icon}
            >
              <DeleteIcon style={{color: '#584332'}} />
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.notes} ${expanded ? styles.expanded : ''}`}>
        <textarea
          value={ring.notes}
          onChange={e => addNotes({ id: ring._id, notes: e.target.value })}
          placeholder="Order Notification"
        >
        </textarea>
      </div>
    </div>
  );
};

Component.propTypes = {
  id: PropTypes.string,
  ring: PropTypes.object,
  changeAmount: PropTypes.func,
  removeProduct: PropTypes.func,
  addNotes: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  ring: getProductFromCart(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  changeAmount: (id, amount) => dispatch(changeProductAmount(id, amount)),
  removeProduct: data => dispatch(removeFromCart(data)),
  addNotes: (id, notes) => dispatch(addOrderNotes(id, notes)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as CartItem,
  Component as CartItemComponent,
};
