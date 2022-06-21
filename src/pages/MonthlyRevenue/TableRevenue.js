import React from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { currencyFormat, percentageFormat } from '../../configs';
import { connect } from 'react-redux';

const TableRevenue = ({ dataTable, formValues }) => {
  if (!dataTable) return null;

  return (
    <div className='mt-4'>
      <Card>
        <CardHeader>
          <h5 className='mb-0'>
            <i className='fa fa-navicon' />
            <strong className='ml-3'>
              Table Revenue Week I - IV Periode {moment(formValues.dateWeek1.endDate).format('MMMM yyyy')}
            </strong>
          </h5>
        </CardHeader>
        <CardBody>
          <div className="table-responsive tabel-monthly-wrapper">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className='lt-space-1'>#</th>
                  <th scope="col" className='lt-space-1'>
                    Week I { formValues
                      ? `(${moment(formValues.dateWeek1.startDate).format('DD')} -
                        ${moment(formValues.dateWeek1.endDate).format('DD MMMM yyyy')})`
                      : ''}
                  </th>
                  <th scope="col" className='lt-space-1'>
                    Week II { formValues
                      ? `(${moment(formValues.dateWeek2.startDate).format('DD')} -
                        ${moment(formValues.dateWeek2.endDate).format('DD MMMM yyyy')})`
                      : ''}
                  </th>
                  <th scope="col" className='lt-space-1'>
                    Week III { formValues
                      ? `(${moment(formValues.dateWeek3.startDate).format('DD')} -
                        ${moment(formValues.dateWeek3.endDate).format('DD MMMM yyyy')})`
                      : ''}
                  </th>
                  <th scope="col" className='lt-space-1'>
                    Week IV { formValues
                      ? `(${moment(formValues.dateWeek4.startDate).format('DD')} -
                        ${moment(formValues.dateWeek4.endDate).format('DD MMMM yyyy')})`
                      : ''}
                  </th>
                  <th scope="col" className='lt-space-1'>Grand Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">TARGET</th>
                  {dataTable.target.map((item, idx) => <td key={`target-${idx}`} className='lt-space-1'>{currencyFormat(item)}</td>)}
                  <td className='lt-space-1'>{currencyFormat(dataTable.target.reduce((a,b) => a + b,  0))}</td>
                </tr>
                <tr>
                  <th scope="row">AKTUAL</th>
                  {dataTable.actual.map((item, idx) => <td key={`actual-${idx}`} className='lt-space-1'>{currencyFormat(item)}</td>)}
                  <td className='lt-space-1'>{currencyFormat(dataTable.actual.reduce((a,b) => a + b,  0))}</td>
                </tr>
                <tr>
                  <th scope="row">PERSENTASE</th>
                  {dataTable.percentage.map((item, idx) => <td key={`percentage-${idx}`}>{percentageFormat(item)}</td>)}
                  <td>{percentageFormat(dataTable.actual.reduce((a,b) => a + b,  0)/dataTable.target.reduce((a,b) => a + b,  0))}</td>
                </tr>
                <tr>
                  <th scope="row">DEVIASI</th>
                  {dataTable.deviation.map((item, idx) => <td key={`deviation-${idx}`} className='lt-space-1'>{currencyFormat(item)}</td>)}
                  <td className='lt-space-1'>{currencyFormat(dataTable.actual.reduce((a,b) => a + b,  0) - dataTable.target.reduce((a,b) => a + b,  0))}</td>
                </tr>
                <tr>
                  <th scope="row">AKUMULASI DEVIASI</th>
                  {dataTable.accumulatedDeviation.map((item, idx) => <td key={`accumulatedDeviation-${idx}`} className='lt-space-1'>{currencyFormat(item)}</td>)}
                  <td className='lt-space-1'>{currencyFormat(dataTable.actual.reduce((a,b) => a + b,  0) - dataTable.target.reduce((a,b) => a + b,  0))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => ({
  dataTable: state.MonthlyReducer.dataTable,
  formValues: state.MonthlyReducer.formValues,
})

export default connect(mapStateToProps)(TableRevenue);
