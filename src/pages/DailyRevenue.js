import React, { useLayoutEffect, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { tableStyle } from '../components/common/TableConfig';
import Button from '../components/common/Button';
import { currencyFormat } from '../configs/utils';

const DailyRevenue = () => {
  const fileTypes = ["xlsx"];
  const [file, setFile] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const b = React.useRef([]);
  const dataJson = React.useRef([]);
  const temp = React.useRef([]);

  const columns = [
    {
      dataField: 'Nama Customer',
      text: 'Nama Customer',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      footer: '',
      footerStyle: {
        backgroundColor: '#e0f2fe',
        borderRightColor: 'transparent'
      }
    },
    {
      dataField: 'Kota Asal',
      text: 'Kota Asal',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      footerAlign: () => 'center',
      footer: 'Total',
      footerStyle: {
        backgroundColor: '#e0f2fe',
        borderRightColor: 'transparent'
      }
    },
    {
      dataField: 'Marketing',
      text: 'Marketing',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      footer: '',
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Colly',
      text: 'Colly',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      footer: columnData => columnData.reduce((acc, item) => acc + item, 0),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Actual Weight',
      text: 'Actual Weight',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      formatter: (data) => Math.round(data),
      footer: columnData => Math.round(columnData.reduce((acc, item) => acc + item, 0)),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Volume Metrik',
      text: 'Volume Metrik',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      formatter: (data) => Math.round(data),
      footer: columnData => Math.round(columnData.reduce((acc, item) => acc + item, 0)),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Biaya',
      text: 'Biaya',
      sort: true,
      headerStyle: tableStyle(200),
      style: tableStyle(200),
      formatter: (data) => currencyFormat(data),
      footer: columnData => currencyFormat(Math.round(columnData.reduce((acc, item) => acc + item, 0))),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
  ]

  const filePathset = (e) => {
    setFile(e);
  }

  const readFile = () => {
    var f = file;
    const reader = new FileReader();
    setIsLoading(true);
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
      /* Update state */
      // console.log("Data>>>" + data);// shows that excel data is read
      // console.log(convertToJson(data)); // shows data in json format
      dataJson.current = convertToJson(data);
      convertToJson(data).forEach(item => {
        if (b.current.indexOf(item['Nama Customer']) < 0)
          b.current = [...b.current, item['Nama Customer']]
      })
      generateDataTable();
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

  const generateDataTable = () => {
    for (let i = 0; i < b.current.length; i++) {
      dataJson.current.forEach(item => {
        if (item['Nama Customer'] === b.current[i]) {
          const index = temp.current.findIndex(x => x['Nama Customer'] === item['Nama Customer']);
          if (index < 0) {
            const newItem = {
              'id': i,
              'Nama Customer': item['Nama Customer'],
              'Kota Asal': item['Nama Kota Origin'],
              'Marketing': item['Nama Marketing'],
              'Colly': Number(item['Kuantitas']),
              'Actual Weight': Number(item['Berat Real']),
              'Volume Metrik': Number(item['Volume Metrik']),
              'Biaya': Number(item['Biaya'])
            }
            temp.current = [...temp.current, newItem];
          } else {
            const newItem = {
              ...temp.current[index],
              'Colly': Number(temp.current[index]['Colly']) + Number(item['Kuantitas']),
              'Actual Weight': Number(temp.current[index]['Actual Weight']) + Number(item['Berat Real']),
              'Volume Metrik': Number(temp.current[index]['Volume Metrik']) + Number(item['Volume Metrik']),
              'Biaya': Number(temp.current[index]['Biaya']) + Number(item['Biaya']),
            }
            temp.current[index] = newItem;
          }
        }
      })
    }
    setDataTable(temp.current);
    setIsLoading(false);
  }

  useLayoutEffect(() => {
    if (dataTable.length) {
      document.querySelector('body').style.backgroundColor = '#FFF';
    }
  }, [dataTable])

  return (
    <div className={!dataTable.length ? 'container-uploader': ''}>
      {dataTable.length ?
        <BootstrapTable
          keyField='id'
          data={dataTable}
          striped
          condensed
          hover
          columns={columns}
          wrapperClasses='table-responsive mt-3'
          noDataIndication='Tidak ada data'
        />
        :
        <>
          <FileUploader
            multiple={false}
            handleChange={filePathset}
            name="file"
            types={fileTypes}
            style={{
              height: 500,
              width: '100%'
            }}
          />
            <Button
              isPrimary
              style={{ marginTop: 20 }}
              isLoading={isLoading}
              onClick={() => {
                readFile();
              }}>
              Generate Report
            </Button>
        </>
      }
    </div>
  )
}

export default DailyRevenue;