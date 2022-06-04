import React from 'react';
import IcLogoApp from '../../../assets/ic_logo_app.png';

const LogoApp = () => {
  return (
    <div className='navbar-brand'>
      <div className='logo-app-full navbar-brand-full'>
        <img src={IcLogoApp} alt='ic-logo-app' width={35} height={35} />
        <span className='ml-2 app-text'>Access Logistic</span>
      </div>
      <div className='navbar-brand-minimized logo-app-minimized'>
        <img src={IcLogoApp} alt='ic-logo-app' width={35} height={35} />
      </div>
    </div>
  )
}

export default LogoApp;
