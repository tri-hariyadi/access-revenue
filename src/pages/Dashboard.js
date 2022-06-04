import React, { PureComponent } from 'react'

export class Dashboard extends PureComponent {

  showText =() => {
    return <p>Halo</p>
  }

  render() {
    return (
      <div>{this.showText()}Dashboard</div>
    )
  }
}

export default Dashboard