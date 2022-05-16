import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { getRingsByRate, fetchPublished } from '../../../redux/ringsRedux.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './Creations.module.scss';
import Divider from '@material-ui/core/Divider';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    rings: PropTypes.array,
    loadProduct: PropTypes.func,
  };
  componentDidMount() {
    this.props.loadProduct();
  }

  render() {
    const { className, rings } = this.props;
    return (
      <Container className={clsx(className, styles.root)}>
        {rings.map((ring) => (
          <div key={ring.option}>
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
                    style={{ color: '#B689C0' }}
                  >
                    See our creations
                  </Button>
                  <Typography component="p">
                    Price from: {ring.price}$
                  </Typography>
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

const mapStateToProps = (state) => ({
  rings: getRingsByRate(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProduct: () => dispatch(fetchPublished()),
});

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export {
  ContainerComponent as Creations,
  Component as CreationsComponent,
};
