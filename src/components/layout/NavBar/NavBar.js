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
//import Autograph  from '@material-ui/icons/Autograph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';


//import ShoppingCart from '@material-ui/icons/ShoppingCart';

const CartWithStorageManage = cartStorage(Cart);
const Component = () => {
  return (
    <AppBar className={styles.AppBar}>
      <Toolbar className={styles.toolbar}>
        <Button
          edge="start"
          startIcon={<FontAwesomeIcon icon={faGem} />}
          className={styles.menuButton}
          color="inherit"
          aria-label="menu"
          href="/creations">
          <Link to="/creations" className={styles.link}>
          OUR CREATIONS
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
