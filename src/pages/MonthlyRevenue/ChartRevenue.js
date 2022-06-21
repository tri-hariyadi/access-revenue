import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Chart } from 'chart.js';
import { connect } from 'react-redux';

const ChartRevenue = ({formValues, dataTable}) => {
  const chart = useRef();

  useEffect(() => {
    if (dataTable) configureChart();
    const el = document.querySelector('canvas');
    if (el) el.style.height='450px';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataTable])

  const configureChart = () => {
    const chartCanvas = chart.current;
    new Chart(chartCanvas, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "TARGET",
            data: dataTable.target,
            pointHoverRadius: [5, 5, 5, 5, 5],
            type: "line",
            backgroundColor: "rgb(75, 192, 192)",
            fill: "false",
            // pointRadius: 0,
            pointStyle: "circle",
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: "DEVIATION",
            data: dataTable.deviation.map(item => item < 0 ? item * -1 : item),
            pointHoverRadius: [5, 5, 5, 5, 5],
            type: "line",
            backgroundColor: "#ef4444",
            fill: "false",
            // pointRadius: 0,
            pointStyle: "circle",
            borderColor: '#ef4444',
            tension: 0.1
          },
          {
            label: "AKTUAL",
            data: dataTable.actual,
            type: "bar",
            backgroundColor: "#DE924B",
            barThickness: 50,
          },
        ],
        labels: [
          "Week I",
          "Week II",
          "Week III",
          "Week IV",
        ]
      },
      options: {
        responsive: true,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        tooltips: {
          displayColors: true
        },
        legend: {
          display: true,
          position: "bottom"
        },
        scales: {
          yAxes: [
            {
              display: true,
              // stacked: true,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              display: true,
              stacked: true,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  if (!dataTable) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className='mb-0'>
            <i className='fa fa-navicon' />
            <strong className='ml-3'>
              Pencapaian Revenue
              ({formValues.marketing.label}) {moment(formValues.dateWeek1.endDate).format('MMMM yyyy')}
            </strong>
          </h5>
        </CardHeader>
        <CardBody>
          <canvas ref={chart} />
        </CardBody>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => ({
  dataTable: state.MonthlyReducer.dataTable,
  formValues: state.MonthlyReducer.formValues,
})

export default connect(mapStateToProps)(ChartRevenue);