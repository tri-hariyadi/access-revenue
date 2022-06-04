import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <span
            className='text-primary'
            style={{ fontSize: '1rem' }}>
            Access Logistic</span> &copy; 2021 Creative Projects.
        </span>
        <span className="ml-auto">Powered by <span
          className='text-primary'
          style={{ fontSize: '1rem' }}>Ummi Aida</span></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
