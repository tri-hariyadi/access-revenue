import React from 'react';
import { Col } from 'reactstrap';

const RenderPaginationPanel = props => {
  return (
    <Col>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
        <span style={{
          textAlign: "left",
          paddingLeft: "0px",
          float: "left",
          display: "flex",
          justifyContent: "flex-start"
        }}>
          <span style={{
            display: "flex",
            alignItems: "center"
          }}>
            {props.components.sizePerPageDropdown} &nbsp; <span style={{ fontSize: window.innerWidth <= 1000 && 12 }}>{props.components.totalText}</span>
          </span>
        </span>
        <span style={{ textAlign: "right", paddingLeft: "0px", float: "right" }}>
          {props.components.pageList}
        </span>
      </div>
    </Col>
  )
}

export default RenderPaginationPanel;
