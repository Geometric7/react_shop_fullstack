import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { connect } from 'react-redux';
import { getRingsByCategory, fetchPublished } from '../../../redux/ringsRedux.js';
import styles from './Products.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class Component extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    categoryRings: PropTypes.array,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    loadProduct:PropTypes.func,
  };

  componentDidMount() {
    this.props.loadProduct();
  }

  render() {
    const { className, categoryRings } = this.props;
    return  (
      <Container className={clsx(className, styles.root)}>
        <h2>{categoryRings[0].categoryName}</h2>
        <Divider variant="middle" className={styles.divider} />
        {categoryRings.map((ring) => (
          <div key={ring.option}>
            <h3>{ring.name}</h3>
            <NavLink key={ring.option} exact to={`/ring/${ring.option}`}>
              <Card className={styles.Card}>
                <CardMedia
                  className={styles.BoardImg}
                  component="img"
                  image={ring.image}
                  option={ring.option}
                />
                <CardContent className={styles.Content}>
                  <Typography component="h3">{ring.option}</Typography>
                  <Typography component="p" className={styles.description}>
                    {ring.description}
                  </Typography>
                  <Button
                    className={styles.button}
                    variant="outlined"
                    style={{color: '#947EC3'}}>Discover</Button>
                  <Typography component="p">Price from: {ring.price}$</Typography>
                </CardContent>
              </Card>
            </NavLink>
            <Divider variant="middle" className={styles.divider} />
          </div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categoryRings: getRingsByCategory(state, props.match.params.id),
});
const mapDispatchToProps = dispatch => ({
  loadProduct: () => dispatch(fetchPublished()),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ContainerComponent as Products,
  Component as ProductsComponent,
};
