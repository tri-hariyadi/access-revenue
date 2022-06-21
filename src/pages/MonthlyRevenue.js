import React, { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import {Button, TextField, SelectField, InputDate} from '../components/common';
import { MothlyValidation, formatNumber, inputCurrencyFormat } from '../configs';
import TableRevenue from './MonthlyRevenue/TableRevenue';
import ChartRevenue from './MonthlyRevenue/ChartRevenue';
import { saveMonthlyRevenue, saveMonthlyJSON } from '../store/actions';

import Spinner from '../assets/swal-spinner.gif';
import { connect } from 'react-redux';

const MonthlyRevenue = ({ dispatch, formValues, dataJson }) => {
  const fileTypes = ["xlsx"];
  const tempDataTable = useRef({
    target: [0, 0, 0, 0],
    actual: [0, 0, 0, 0],
    percentage: [0, 0, 0, 0],
    deviation: [0, 0, 0, 0],
    accumulatedDeviation: [0, 0, 0, 0]
  });
  const [dropDownMarketing, setDropDownMarketing] = useState([]);
  const formikRef = useRef();

  useEffect(() => {
    if (dataJson.length) {
      // eslint-disable-next-line
      const data = dataJson.filter((item, index) => {
        if (item['Nama Marketing'])
          return dataJson.findIndex((el) => el['Nama Marketing'] === item['Nama Marketing']) === index;
      }).map((item) => ({label: item['Nama Marketing'], value: item['Nama Marketing']}));
      setDropDownMarketing(data);
      swal.close();
    }
  }, [dataJson]);

  const compareFormValues = (values) => {
    if (formValues) {
      if (JSON.stringify(formValues) !== (JSON.stringify(values))) {
        swal('Warning', 'Parameter telah diubah, silahkan generate ulang data.', 'warning')
          .then(() => dispatch(saveMonthlyRevenue(false, false)));
      }
    }
  }

  const readFile = (f) => {
    const reader = new FileReader();
    swal({
      title: 'Mengupload File',
      text: 'Harap Menunggu',
      icon: Spinner,
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false
    });
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1, FS: '#~', RS: '@#' });
      dispatch(saveMonthlyJSON(convertToJson(data)));
    };
    reader.readAsBinaryString(f);
  }

  const convertToJson = (csv) => {
    var lines = csv.split("@#");

    var result = [];

    var headers = lines[0].split("#~");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split("#~");
      
      for (var j = 0; j < headers.length; j++) {
        if (currentline[j]) obj[headers[j]] = currentline[j];
      }

      if (Object.keys(obj).length) result.push(obj);
    }

    return result; //JSON
  }

  const onSubmit = (values) => {
    const getNumber = (value) => Number(value.toString().replace(/[^\d]/g, ''))
    if (dataJson.length) {
      const newDataJson = dataJson.filter((item) => item['Nama Marketing'] === values.marketing.value);
      const actual = {
        week0: newDataJson.filter(item =>
          new Date(item['Tgl. Pickup']).getTime() >= new Date(moment(values.dateWeek1.startDate).format('yyyy-MM-DD')).getTime() &&
          new Date(item['Tgl. Pickup']).getTime() <= new Date(moment(values.dateWeek1.endDate).format('yyyy-MM-DD')).getTime())
          .reduce((a,b) => formatNumber(a) + formatNumber(b['Biaya']), 0),
        week1: newDataJson.filter(item =>
          new Date(item['Tgl. Pickup']).getTime() >= new Date(moment(values.dateWeek2.startDate).format('yyyy-MM-DD')).getTime() &&
          new Date(item['Tgl. Pickup']).getTime() <= new Date(moment(values.dateWeek2.endDate).format('yyyy-MM-DD')).getTime())
          .reduce((a,b) => formatNumber(a) + formatNumber(b['Biaya']), 0),
        week2: newDataJson.filter(item =>
          new Date(item['Tgl. Pickup']).getTime() >= new Date(moment(values.dateWeek3.startDate).format('yyyy-MM-DD')).getTime() &&
          new Date(item['Tgl. Pickup']).getTime() <= new Date(moment(values.dateWeek3.endDate).format('yyyy-MM-DD')).getTime())
          .reduce((a,b) => formatNumber(a) + formatNumber(b['Biaya']), 0),
        week3: newDataJson.filter(item =>
          new Date(item['Tgl. Pickup']).getTime() >= new Date(moment(values.dateWeek4.startDate).format('yyyy-MM-DD')).getTime() &&
          new Date(item['Tgl. Pickup']).getTime() <= new Date(moment(values.dateWeek4.endDate).format('yyyy-MM-DD')).getTime())
          .reduce((a,b) => formatNumber(a) + formatNumber(b['Biaya']), 0),
      }
      
      for (let i = 0; i < tempDataTable.current.actual.length; i++) {
        tempDataTable.current.actual[i] = actual[`week${i}`];
        tempDataTable.current.target[i] = getNumber(values[`targetWeek${i}`]);
      }
      
      for (let j = 0; j < tempDataTable.current.actual.length; j++) {
        const actual = tempDataTable.current.actual[j];
        const target = tempDataTable.current.target[j];
        tempDataTable.current.percentage[j] = actual / target;
        tempDataTable.current.deviation[j] = target - actual;
        tempDataTable.current.accumulatedDeviation[j] = tempDataTable.current.deviation[j];
      }
      dispatch(saveMonthlyRevenue(tempDataTable.current, values));
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className='mb-0'>
            <i className='fa fa-navicon' />
            <strong className='ml-3'>Mothly Revenue</strong>
          </h5>
        </CardHeader>
        <CardBody>
          {!dataJson.length
            ? (
              <div id='upload_drag_drop' className='w-100 d-flex flex-column justify-content-center align-items-center'>
                <FileUploader
                  multiple={false}
                  handleChange={readFile}
                  name="file"
                  types={fileTypes}
                  style={{
                    height: 500,
                    width: '100%'
                  }}
                />
              </div>
            )
            : (
              <Formik
                initialValues={formValues ? {...formValues} : {
                  dateWeek1: {
                    startDate: '',
                    endDate: '',
                  },
                  dateWeek2: {
                    startDate: '',
                    endDate: '',
                  },
                  dateWeek3: {
                    startDate: '',
                    endDate: '',
                  },
                  dateWeek4: {
                    startDate: '',
                    endDate: '',
                  },
                  targetWeek0: '',
                  targetWeek1: '',
                  targetWeek2: '',
                  targetWeek3: '',
                  marketing: '',
                }}
                validate={(values) => {
                  compareFormValues(values);
                }}
                validationSchema={MothlyValidation}
                onSubmit={onSubmit}
                ref={formikRef}
                render={
                  (props) => {
                    return (
                      <section className='container-fluid'>
                        <Row>
                          <Col md='6'>
                            <InputDate {...props}
                              type='date'
                              name='dateWeek1'
                              label='Tgl Week I'
                              placeholder='Range Tanggal Week 1'
                            />
                          </Col>
                          <Col md='6'>
                            <InputDate {...props}
                              type='date'
                              name='dateWeek2'
                              label='Tgl Week II'
                              placeholder='Range Tanggal Week 2'
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <InputDate {...props}
                              type='date'
                              name='dateWeek3'
                              label='Tgl Week III'
                              placeholder='Range Tanggal Week 3'
                            />
                          </Col>
                          <Col md='6'>
                            <InputDate {...props}
                              type='date'
                              name='dateWeek4'
                              label='Tgl Week IV'
                              placeholder='Range Tanggal Week 4'
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <TextField {...props}
                              name='targetWeek0'
                              label='Target Week I'
                              format={inputCurrencyFormat}
                              textTransform='none'
                            />
                          </Col>
                          <Col md='6'>
                            <TextField {...props}
                              name='targetWeek1'
                              label='Target Week II'
                              format={inputCurrencyFormat}
                              textTransform='none'
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <TextField {...props}
                              name='targetWeek2'
                              label='Target Week III'
                              format={inputCurrencyFormat}
                              textTransform='none'
                            />
                          </Col>
                          <Col md='6'>
                            <TextField {...props}
                              name='targetWeek3'
                              label='Target Week IV'
                              format={inputCurrencyFormat}
                              textTransform='none'
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md='6'>
                            <SelectField
                              {...props}
                              name='marketing'
                              label='Marketing'
                              options={dropDownMarketing}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className='pt-4'>
                            <div className='float-right d-inline-flex'>
                              <Button isDanger onClick={() => {
                                dispatch(saveMonthlyJSON([]));
                                dispatch(saveMonthlyRevenue(false, false));
                              }}>
                                <i className="fa fa-upload mr-2"></i>
                                Upload Ulang File
                              </Button>
                              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                              <Button isPrimary type='submit' onClick={props.handleSubmit}>
                                <i className="fa fa-pie-chart mr-2"></i>
                                Generate Report
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </section>
                    )
                  }
                }
              />
            )
          }
        </CardBody>
      </Card>
      <TableRevenue />
      <ChartRevenue/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  formValues: state.MonthlyReducer.formValues,
  dataJson: state.MonthlyReducer.dataJson,
})

export default connect(mapStateToProps)(MonthlyRevenue);
