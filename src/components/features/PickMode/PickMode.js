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
    options: PropTypes.array,
  };
  onChange = value => this.setState({ value });

  render() {
    const {options} = this.props;
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
          <img  className="img-example" src={options[value].image} alt={options[value].option} />
        </Carousel>
        <Dots
          value={value}
          onChange={this.onChange}
          className={styles.thumbnails}
          thumbnails={[
            (<img key={1} className={styles.thumbImg} src={options[0].image} alt={options[0].option} />),
            (<img key={2} className={styles.thumbImg} src={options[1].image} alt={options[1].option} />),
            (<img key={3} className={styles.thumbImg} src={options[2].image} alt={options[2].option} />),
            (<img key={4} className={styles.thumbImg} src={options[3].image} alt={options[3].option} />),
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