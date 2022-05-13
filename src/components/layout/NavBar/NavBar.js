import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Flare  from '@material-ui/icons/Flare';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar className={styles.AppBar}>
      <Toolbar>
        <Button edge="start" startIcon= {<Flare />} className={styles.menuButton} color="inherit" aria-label="menu">
          <Link to = '/my-posts'
            className={styles.login}>
                Our creations
          </Link>
        </Button>
        <Typography align='center' variant='h4' className={styles.brand}>Enchanted Rings</Typography>
        <Button edge="end" color="inherit" startIcon= {<ShoppingCart />}>
          <Link
            to="/client"
            className={styles.login}
          >Your Cart</Link>
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NavBar,
  Component as NavBarComponent,
};
