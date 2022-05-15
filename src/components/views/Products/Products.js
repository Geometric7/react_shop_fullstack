import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getRingsByCategory } from '../../../redux/ringsRedux.js';
import { getHeaderById } from '../../../redux/categoriesRedux';
import styles from './Products.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const Component = ({ className, children, categoryRings, category }) => (
  <Container className={clsx(className, styles.root)}>
    <h2>{category[0].name}!</h2>
    <Divider variant="middle" className={styles.divider} />
    {categoryRings.map((ring) => (
      <div key={ring.variant}>
        <h3>{ring.name}</h3>
        <NavLink key={ring.variant} exact to={`/ring./${ring.variant}`}>
          <Card className={styles.Card}>
            <CardMedia
              className={styles.BoardImg}
              component="img"
              image={ring.image}
              variant={ring.variant}
            />
            <CardContent className={styles.Content}>
              <Typography component="h3">{ring.variant}</Typography>
              <Typography component="p" className={styles.description}>
                {ring.description}
              </Typography>
              <Button className={styles.button} variant="outlined" color="primary">See more</Button>
              <Typography component="p">Price from: {ring.price}$</Typography>
            </CardContent>
          </Card>
        </NavLink>
        <Divider variant="middle" className={styles.divider} />
      </div>
    ))}
  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  categoryRings: PropTypes.array,
  category: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  category: getHeaderById(state, props.match.params.id),
  categoryRings: getRingsByCategory(state, props.match.params.id),
});

const ContainerComponent = connect(mapStateToProps)(Component);

export {
  ContainerComponent as Products,
  Component as ProductsComponent,
};
