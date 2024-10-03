import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import deliveryData from './delivery_Schedule.json'; // Adjust the path based on your project structure
import Card from '@mui/material/Card';


const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  // On mount, process data and update state
  useEffect(() => {
    if (deliveryData && deliveryData.data) {
      const data = deliveryData.data;

      // Process the data for all charts
      const monthlyCounts = aggregateByMonth(data);
      const chartData = Object.keys(monthlyCounts).map(month => ({
        month,
        deliveredQty: monthlyCounts[month].deliveredQty,
        notDeliveredQty: monthlyCounts[month].notDeliveredQty,
      })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

      setChartData(chartData);

      const cumulativeCounts = calculateCumulativeDeliveredQty(monthlyCounts);
      const cumulativeData = Object.keys(cumulativeCounts).map(month => ({
        month,
        deliveredQty: cumulativeCounts[month],
      }));
      setCumulativeData(cumulativeData);

      const monthlyCustomerCounts = aggregateCustomerData(data);
      const customerData = Object.keys(monthlyCustomerCounts).map(month => ({
        month,
        customerAcceptedQty: monthlyCustomerCounts[month].customerAcceptedQty,
        qty: monthlyCustomerCounts[month].qty,
        acceptanceRate: monthlyCustomerCounts[month].acceptanceRate,
      }));
      setCustomerData(customerData);
    } else {
      console.error('Data not found or invalid');
    }
  }, []);

  // Define chart options for each chart

  // First Chart: Fulfillment Pipeline
  const chartOptions1 = {
    chart: { type: 'bar', height: 500 },
    title: { text: 'Fulfillment Pipeline', align: 'center' },
    xaxis: { categories: chartData.map(item => item.month) },
    series: [
      { name: 'Delivered Quantity', data: chartData.map(item => item.deliveredQty), color: '#00c66b' },
      { name: 'Not Yet Delivered', data: chartData.map(item => item.notDeliveredQty), color: '#ed4545' },
    ],
    plotOptions: {
      bar: { 
        dataLabels: { position: 'top' },
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['black'], // Set the color of data labels to black
      },
      offsetY: -18, // Adjust this value to set the margin above the bars
      formatter: function (val) { return val > 0 ? val : ''; }
    }
  };

  // Second Chart: Consumption Trend (Cumulative)
  const chartOptions2 = {
    chart: { type: 'bar', height: 500 },
    title: { text: 'Consumption Trend (Cumulative)', align: 'center' },
    xaxis: { categories: cumulativeData.map(item => item.month) },
    series: [
      { name: 'Cumulative Delivered Quantity', data: cumulativeData.map(item => item.deliveredQty), color: '#7A1CAC' },
    ],
    plotOptions: {
      bar: {
        dataLabels: { position: 'top' },
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['black'], // Set the color of data labels to black
      },
      offsetY: -18, // Adjust this value to set the margin above the bars
      formatter: function (val) { return val; }
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // Third Chart: Acceptance Rate
  const chartOptions3 = {
    chart: { height: 500 },
    title: { text: 'Acceptance Rate', align: 'center' },
    xaxis: { categories: customerData.map(item => item.month) },
    series: [
      { name: 'Customer Accepted Quantity', type: 'bar', data: customerData.map(item => item.customerAcceptedQty), color: '#7A1CAC' },
      { name: 'Quantity Shipped to Customer', type: 'bar', data: customerData.map(item => item.qty), color: '#41B3A2' },
      { name: 'Acceptance Rate (%)', type: 'line', data: customerData.map(item => item.acceptanceRate), color: '#790252' }
    ],
    plotOptions: {
      bar: {
        dataLabels: { position: 'top' },
        horizontal: false,
        columnWidth: '50%',  // Adjust the width of the bars
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) { return val; }
    },
    yaxis: [
      {
        title: { text: 'Customer Accepted Quantity' },
        min: 0,
        max: Math.max(...customerData.map(item => item.customerAcceptedQty)) + 1000, // Adjust max as needed
        labels: {
          formatter: function (value) {
            return value; // Optional: format labels if necessary
          },
        },
      },
      {
        opposite: true,
        title: { text: 'Quantity Shipped to Customer' },
        min: 0,
        max: Math.max(...customerData.map(item => item.qty)) + 1000, // Ensure proper scaling
        labels: {
          formatter: function (value) {
            return value; // Optional: format labels if necessary
          },
        },
      },
      {
        opposite: true,
        title: { text: 'Acceptance Rate (%)' },
        min: 0,
        max: 100,
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  

  return (
    <div>
      <div>
        <h2 className='my-2'>Fulfillment Pipeline</h2>
        <Card className='p-2'>
          <Chart options={chartOptions1} series={chartOptions1.series} type="bar" height={500} />
        </Card>
      </div>
      <div>
        <h2 className='my-3'>Consumption Trend (Cumulative)</h2>
        <Card className='p-2'>
          <Chart options={chartOptions2} series={chartOptions2.series} type="bar" height={500} />
        </Card>
      </div>
      <div>
        <h2 className='my-3'>Acceptance Rate</h2>
        <Card className='p-2'>
          <Chart options={chartOptions3} series={chartOptions3.series} type="line" height={500} />
        </Card>
      </div>
    </div>
  );
};

// Helper functions for data processing
const aggregateByMonth = (data) => {
  const counts = {};
  data.forEach(item => {
    const month = new Date(item.Delivery_Date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!counts[month]) {
      counts[month] = { deliveredQty: 0, notDeliveredQty: 0 };
    }
    if (item.Delivery_Status === 'Delivered') {
      counts[month].deliveredQty += Number(item.Qty) || 0;
    } else if (item.Delivery_Status === 'Not Yet Delivered') {
      counts[month].notDeliveredQty += Number(item.Qty) || 0;
    }
  });
  return counts;
};

const calculateCumulativeDeliveredQty = (monthlyCounts) => {
  const months = Object.keys(monthlyCounts).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  let cumulativeQty = 0;
  const cumulativeCounts = {};
  months.forEach(month => {
    cumulativeQty += monthlyCounts[month].deliveredQty;
    cumulativeCounts[month] = cumulativeQty;
  });
  return cumulativeCounts;
};

const aggregateCustomerData = (data) => {
  const counts = {};
  data.forEach(item => {
    const month = new Date(item.Delivery_Date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!counts[month]) {
      counts[month] = { customerAcceptedQty: 0, qty: 0, acceptanceRate: 0 };
    }
    counts[month].customerAcceptedQty += Number(item.Customer_Accepted_Quantity) || 0;
    counts[month].qty += Number(item.Qty) || 0;
    counts[month].acceptanceRate = parseFloat(((counts[month].customerAcceptedQty / counts[month].qty) * 100).toFixed(2)) || 0;
  });
  return counts;
};

export default Analytics;
