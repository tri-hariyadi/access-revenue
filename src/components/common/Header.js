import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import NullPhoto from '../../assets/null-photo.png';

const Header = (props) => {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(v => !v);
  }

  const navigateToReimbursement = () => {
    history.push({
      state: {
        DATA: props.notif.dataReimburse,
        dataSearch: props.notif.dataSearch
      }, pathname: '/reimbursement'
    });
  }

  const navigateToUpdateProfile = () => {
    history.push('/user/request-update-profile');
  }

  return (
    <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
      <div style={{ position: 'relative' }}>
        <DropdownToggle nav>
          <img src={NullPhoto} className="img-avatar" alt="admin" />
        </DropdownToggle>
        {props.notif && props.notif.total > 0 && <Badge color="danger" style={{ position: 'absolute', top: -5, right: 4, borderRadius: '100%' }}>{props.notif.total + props.notif.reqUpdateProfile}</Badge>}
      </div>
      <DropdownMenu right>
        <DropdownItem header tag="div" className="text-center">
          <strong>Notification</strong>
        </DropdownItem>
        <DropdownItem onClick={navigateToReimbursement}>
          <i className="fa fa-bell-o"></i> Reimbursement{props.notif && props.notif.total > 0 && <Badge color="danger">{props.notif.total}</Badge>}
        </DropdownItem>
        <DropdownItem onClick={navigateToUpdateProfile}>
          <i className="fa fa-bell-o"></i> User Upadate Profile&nbsp;&nbsp;&nbsp;{props.notif && props.notif.reqUpdateProfile > 0 && <Badge color="danger">{props.notif.reqUpdateProfile}</Badge>}
        </DropdownItem>
        <DropdownItem header tag="div" className="text-center">
          <strong>Settings</strong>
        </DropdownItem>
        <DropdownItem onClick={props.onLogout}>
          <i className="fa fa-lock"></i> Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Header
