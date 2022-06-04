import React from 'react';
import { Row, Col } from 'reactstrap';

const sortOption = (sortFunc) => ({
  sortFunc,
  sortCaret: (order) => {
    if (!order) return (<span className='icon'>&nbsp;&nbsp;&#xf0d7;&#xf0d8;</span>);
    if (order === 'asc') {
      return (
        <span className='icon'>
          &nbsp;&nbsp;&#xf0d7;
          <font color='#ff7043'>&#xf0d8;</font>
        </span>
      );
    }
    if (order === 'desc') {
      return (
        <span className='icon'>
          &nbsp;&nbsp;
          <font color='#ff7043'>&#xf0d7;</font>
          &#xf0d8;
        </span>
      );
    }
    return null;
  },
});

const customTotal = (from, to, size) => (
  <span className='react-bootstrap-table-pagination-total ml-2'>
    Showing
    {' '}
    {from}
    {' '}
    to
    {' '}
    {to}
    {' '}
    of
    {' '}
    {size}
    {' '}
    Results
  </span>
);

const CustomBar = ({ toolkitprops, children, searchBar = true }) => {
  let input;
  const handleChange = () => toolkitprops.searchProps.onSearch(input.value);

  return (
    <Row>
      <Col md={searchBar ? '6' : '12'}>
        <div className={searchBar ? 'float-left' : ''}>
          {children}
        </div>
      </Col>
      {searchBar &&
        <Col md='6'>
          <div className='search-wrapper float-right'>
            <div>
              <input
                className='form-control search-bar'
                ref={(n) => { input = n; }}
                type='text'
                autoComplete='off'
                placeholder='&#61442; Search'
                onKeyUp={handleChange}
              />
            </div>
          </div>
        </Col>
      }
    </Row>
  );
};

const options = {
  page: 1,
  pageStartIndex: 1,
  paginationSize: 3,
  firstPageText: 'First',
  lastPageText: 'Last',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: '30',
      value: 30,
    },
    {
      text: '50',
      value: 50,
    },
  ],
};

const tableStyle = (minWidth) => ({
  textAlign: 'left',
  padding: '20px 10px',
  verticalAlign: 'middle',
  whiteSpace: 'normal',
  minWidth: minWidth ? `${minWidth}px` : '120px',
});

export {
  options,
  tableStyle,
  CustomBar,
  sortOption,
};
