import React from 'react';
import propTypes from 'prop-types';
import Spinner from '../../assets/Spinner2.gif';

const LoadingFilter = ({ textdesc, iconWidth = 100, iconHeight = 100, className }) => {
  return (
    <div className={[className, 'd-flex align-items-center justify-content-center flex-column'].join(' ')}>
      <img src={Spinner} alt='spinner-load' width={iconWidth} height={iconHeight} />
      <h5 style={{ fontFamily: 'FSAlbertBold' }}>{textdesc ? textdesc : 'Loading...'}</h5>
    </div>
  )
}

LoadingFilter.propTypes = {
  textdesc: propTypes.string,
  iconWidth: propTypes.number,
  iconHeight: propTypes.number,
  className: propTypes.string
}

export default LoadingFilter;
