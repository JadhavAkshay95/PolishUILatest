import React, { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js';

const Chart: any = require('chart.js');

export const ChartColors = [
  '#7B67FF',
  '#2610BA',
  '#16BFF3',
  '#006DD8',
  '#40E0D0',
];

const getFormattedData = (
  labels: string[],
  values: Array<string | number>,
) => ({
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: values,
      backgroundColor: ChartColors,
    },
  ],
});

const getConfig = (data: any) => ({
  type: 'doughnut',
  data,
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  },
});

const DoughnutChart = ({
  labels,
  values,
  style,
}: {
  labels: string[];
  values: Array<string | number>;
  style?: any;
}) => {
  const chartContainer = useRef(null);

  const formattedData = getFormattedData(labels, values);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(
        chartContainer.current,
        getConfig(formattedData),
      );
    }
  }, [chartContainer, formattedData]);

  return <canvas style={style} ref={chartContainer} />;
};

export default React.memo(DoughnutChart);
