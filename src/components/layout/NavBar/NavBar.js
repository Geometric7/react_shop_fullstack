import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Cart } from '../../features/Cart/Cart';
import styles from './NavBar.module.scss';
import cartStorage from '../../../_HOcomponents/cartStorage/cartStorage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Flare  from '@material-ui/icons/Flare';
//import ShoppingCart from '@material-ui/icons/ShoppingCart';

const CartWithStorageManage = cartStorage(Cart);
const Component = () => {
  return (
    <AppBar className={styles.AppBar}>
      <Toolbar className={styles.toolbar}>
        <Button
          edge="start"
          startIcon={<Flare />}
          className={styles.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Link to="/creations" className={styles.login}>
            Our New Creations
          </Link>
        </Button>
        <Link to="/" className={styles.login}>
          <Typography align="center" variant="h4" className={styles.brand}>
            Enchanted
            <span className={styles.brans}> Rings</span>
          </Typography>
        </Link>
        <CartWithStorageManage/>
      </Toolbar>
    </AppBar>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mobile: PropTypes.bool,
};

export {
  Component as NavBar,
  Component as NavBarComponent,
};
