import React from 'react';
import PropTypes from 'prop-types';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaTumblr, FaTiktok, FaRegHandPointer } from 'react-icons/fa';


import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

import styles from './Footer.module.scss';

const Component = ({className, children}) => (

  <footer className={clsx(className, styles.root)}>
    <Typography variant="h6" align="center">
      <div className='icon-box'>
        <a href='/'>
          <FaTwitter className="mx-2" />
        </a>
        <a href='/'>
          <FaInstagram className='mx-2' />
        </a>
        <a href='/'>
          <FaYoutube className='mx-2' />
        </a>
        <a href='/'>
          <FaFacebook className='mx-2' />
        </a>
        <a href='/'>
          <FaTumblr className='mx-2' />
        </a>
        <a href='/'>
          <FaTiktok className='mx-2' />
        </a>
      </div>
    </Typography>
    <Typography variant="h6" align="center" gutterBottom>
    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      &copy; Copyright 2022, Enchanted Rings. All Rights Reserved
    </Typography>
  </footer>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
