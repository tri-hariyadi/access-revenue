import React from 'react';
import { Nav } from 'reactstrap';

import { AppSidebarToggler } from '@coreui/react';
import { LogoApp } from '../components';

const DefaultHeader = (props) => {
  return (
    <React.Fragment>
      <AppSidebarToggler className='d-lg-none' display='md' mobile />
      <LogoApp />
      <AppSidebarToggler className='d-md-down-none' display='lg' />
      <Nav className='ml-auto mr-4' navbar>
        <div></div>
      </Nav>
    </React.Fragment>
  )
}

export default DefaultHeader;
