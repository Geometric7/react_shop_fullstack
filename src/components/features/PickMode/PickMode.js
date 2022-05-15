import React from 'react';
import PropTypes from 'prop-types';

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import styles from './PickMode.module.scss';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  static propTypes = {
    className: PropTypes.string,
    variants: PropTypes.array,
  };
  onChange = value => this.setState({ value });

  render() {
    const {variants} = this.props;
    const {value} = this.state;
    return (
      <div className={ styles.root}>
        <Carousel
          slidesPerPage={1}
          slidesPerScroll={1}
          animationSpeed={1500}
          clickToChange
          centered
          value={value}
          onChange={this.onChange}
          className={styles.Carousel}
        >
          <img  className="img-example" src={variants[value].image} alt={variants[value].variant} />
        </Carousel>
        <Dots
          value={value}
          onChange={this.onChange}
          className={styles.thumbnails}
          thumbnails={[
            (<img key={1} className={styles.thumbImg} src={variants[0].image} alt={variants[0].variant} />),
            (<img key={2} className={styles.thumbImg} src={variants[1].image} alt={variants[1].variant} />),
            (<img key={3} className={styles.thumbImg} src={variants[2].image} alt={variants[2].variant} />),
            (<img key={4} className={styles.thumbImg} src={variants[3].image} alt={variants[3].variant} />),
          ]}
        />
      </div>
    );
  }
}

export {
  Component as PickMode,
  Component as PickModeComponent,
};
