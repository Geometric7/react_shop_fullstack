/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

export function delayDisconnect(Component) {
  return class extends React.Component {
    state = {
      shouldRender: true,
    };
    static propTypes = {
      history: PropTypes.object,
    };

    componentDidMount() {
      this.interval = setTimeout(() => this.setState({ shouldRender: false }), 3000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        this.state.shouldRender ? <Component {...this.props} /> : null
      );
    }
  };
}
