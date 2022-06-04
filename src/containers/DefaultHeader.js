import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Nav } from 'reactstrap';
import { toast } from "react-toastify";

import { AppSidebarToggler } from '@coreui/react';
import { LogoApp, Header } from '../components';
import { revokeToken } from '../store';

const DefaultHeader = (props) => {
  const history = useHistory();
  const [notif, setNotif] = useState(false);
  const [prevNotif, setPrevNotif] = useState(false);

  useEffect(() => {
    const sse = new EventSource(`${process.env.REACT_APP_API_URL2}reimbursement/notif`);
    function getRealtimeData(data) {
      // process the data here,
      // then pass it to state to be rendered
      // console.log(data);
      setNotif(data);
    }
    sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here
      sse.close();
    }
    return () => {
      sse.close();
    };
  }, []);

  const logout = () => {
    revokeToken();
    window.localStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('accessToken');
    history.replace('/login');
  }

  useEffect(() => {
    if (!prevNotif && notif) setPrevNotif(notif);
    if ((notif.total !== prevNotif.total) || (notif.reqUpdateProfile !== prevNotif.reqUpdateProfile)) {
      setPrevNotif(notif);
      if ((notif.total + notif.reqUpdateProfile) > 0)
        toast.info(`Ada ${notif.total + notif.reqUpdateProfile} pemberitahuan baru.`);
    }
  }, [notif, prevNotif]);

  return (
    <React.Fragment>
      <AppSidebarToggler className='d-lg-none' display='md' mobile />
      <LogoApp />
      <AppSidebarToggler className='d-md-down-none' display='lg' />
      <Nav className='ml-auto mr-4' navbar>
        <Header onLogout={logout} notif={notif} />
      </Nav>
    </React.Fragment>
  )
}

export default DefaultHeader;
