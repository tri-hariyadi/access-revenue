import React, { useLayoutEffect, useRef, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { tableStyle, CustomBar } from '../components/common/TableConfig';
import Button from '../components/common/Button';
import { currencyFormat, formatNumber } from '../configs/utils';
import swal from 'sweetalert';

const DailyRevenue = () => {
  const fileTypes = ["xlsx"];
  const [file, setFile] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const b = useRef([]);
  const dataJson = useRef([]);
  const temp = useRef([]);
  const dataExported = useRef([]);

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
      dataField: 'Tgl. Pickup',
      text: 'Tgl. Pickup',
      sort: true,
      headerStyle: tableStyle(150),
      style: tableStyle(150),
      footerAlign: () => 'right',
      footer: 'Total',
      footerStyle: {
        backgroundColor: '#e0f2fe',
        borderRightColor: 'transparent'
      }
    },
    {
      dataField: 'Kota Asal',
      text: 'Kota Asal',
      sort: true,
      headerStyle: tableStyle(120),
      style: tableStyle(120),
      footer: '',
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
      headerStyle: tableStyle(100),
      style: tableStyle(100),
      footer: columnData => columnData.reduce((acc, item) => formatNumber(acc) + formatNumber(item), 0),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Actual Weight',
      text: 'Actual Weight',
      sort: true,
      headerStyle: tableStyle(100),
      style: tableStyle(100),
      formatter: (data) => formatNumber(data),
      footer: columnData => columnData.reduce((acc, item) => formatNumber(acc) + formatNumber(item), 0),
      footerStyle: {
        backgroundColor: '#e0f2fe',
      }
    },
    {
      dataField: 'Volume Metrik',
      text: 'Volume Metrik',
      sort: true,
      headerStyle: tableStyle(100),
      style: tableStyle(100),
      formatter: (data) => formatNumber(data),
      footer: columnData => columnData.reduce((acc, item) => formatNumber(acc) + formatNumber(item), 0),
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
      formatter: (data) => currencyFormat(formatNumber(data)),
      footer: columnData => currencyFormat(columnData.reduce((acc, item) => formatNumber(acc) + formatNumber(item), 0)),
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
    if (!f) return swal('Warning', 'Harap upload file terlebih dahulu sebelum generate report', 'warning');
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
              'Tgl. Pickup': item['Tgl. Pickup'],
              'Kota Asal': item['Nama Kota Origin'],
              'Marketing': item['Nama Marketing'],
              'Colly': formatNumber(item['Kuantitas']),
              'Actual Weight': formatNumber(item['Berat Real']),
              'Volume Metrik': formatNumber(item['Volume Metrik']),
              'Biaya': formatNumber(item['Biaya'])
            }
            temp.current = [...temp.current, newItem];
          } else {
            const newItem = {
              ...temp.current[index],
              'Colly': formatNumber(temp.current[index]['Colly']) + formatNumber(item['Kuantitas']),
              'Actual Weight': formatNumber(temp.current[index]['Actual Weight']) + formatNumber(item['Berat Real']),
              'Volume Metrik': formatNumber(temp.current[index]['Volume Metrik']) + formatNumber(item['Volume Metrik']),
              'Biaya': formatNumber(temp.current[index]['Biaya']) + formatNumber(item['Biaya']),
            }
            temp.current[index] = newItem;
          }
        }
      })
    }
    setDataTable(temp.current);
    setIsLoading(false);
  }

  const exportToExcel = () => {
    let wb = XLSX.utils.book_new();
    wb.Props = {
      Title: 'Excel Data Revenue Access',
      Subject: 'File',
      Author: 'Admin Access',
      CreatedDate: new Date()
    };
    wb.SheetNames.push('File Revenue');
    let ws = XLSX.utils.json_to_sheet([...dataExported.current], { header: Object.keys(dataExported.current[0]) });
      wb.Sheets['File Revenue'] = ws;
      let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const s2ab = (s) => {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      saveAs(
        new Blob([s2ab(wbout)],
          { type: 'application/octet-stream' }),
        `revenue-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
      );
  }

  const afterSearch = (newResult) => {
    dataExported.current = newResult;
  };

  useLayoutEffect(() => {
    if (dataTable.length) {
      document.querySelector('body').style.backgroundColor = '#FFF';
    }

    return () => document.querySelector('body').style.backgroundColor = '#E4E5E6';
  }, [dataTable]);

  return (
    <div className={!dataTable.length ? 'container-uploader': ''}>
      {dataTable.length ?
        <div className='w-100'>
          <ToolkitProvider
            bootstrap4
            search={{afterSearch}}
            keyField='id'
            data={dataTable}
            columns={columns}>
              {toolkitprops => (
                <div>
                  <CustomBar toolkitprops={toolkitprops}>
                    <Button isSuccess onClick={exportToExcel}>
                      Expoort Excel
                    </Button>
                  </CustomBar>
                  <BootstrapTable
                    striped
                    condensed
                    hover
                    columns={columns}
                    wrapperClasses='table-responsive mt-3'
                    noDataIndication='Tidak ada data'
                    {...toolkitprops.baseProps}
                  />
                </div>
              )}
          </ToolkitProvider>
        </div>
        :
        <div id='upload_drag_drop' className='w-100 d-flex flex-column justify-content-center align-items-center'>
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
        </div>
      }
    </div>
  )
}

export default DailyRevenue;