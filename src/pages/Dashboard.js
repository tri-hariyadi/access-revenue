import React, { PureComponent } from 'react';
import { Card, CardBody } from 'reactstrap';

export class Dashboard extends PureComponent {

  showText =() => {
    return <p>Halo</p>
  }

  render() {
    return (
      <Card>
        <CardBody>
          <h2>Halo Sales</h2>
          <p>Selamat Datang di aplikasi Access Revenue</p>
        </CardBody>
      </Card>
    )
  }
}

export default Dashboard