import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Box, Paper, Typography } from '@mui/material';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes } from '../../components/apiLinks/APILinkRoutes';

const AssetsUtilisationPieChart = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.ViewAssetsRoute);

  const [chartData, setChartData] = useState({
    series: [], // Pie chart data
    options: {
      chart: {
        type: 'pie',
        height: 400,
        toolbar: {
          show: false,
        },
      },
      labels: [],  // Pie chart labels
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        markers: {
          radius: 12,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val !== undefined ? val : 0} units`,  // Fallback to 0 if val is undefined
        },
      },
      colors: ['#82ca9d', '#ff7300', '#8884d8', '#d45087', '#4daf4a'],  // Customize color palette
      dataLabels: {
        enabled: false,  // Disable data labels on the chart itself
      },
    },
  });

  useEffect(() => {
    console.log('Fetched data:', data); // Log the fetched data
    if (data && Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => ({
        partName: item.PART_NAME || 'Unknown', // Provide a default value
        patternLifeQty: parseInt(item.PATTERN_LIFE_QTY) || 0, // Fallback to 0 if undefined
      })).filter(item => item.patternLifeQty > 0); // Filter out items with 0 quantity

      if (formattedData.length > 0) {
        setChartData((prev) => ({
          ...prev,
          series: formattedData.map((item) => item.patternLifeQty),
          options: {
            ...prev.options,
            labels: formattedData.map((item) => item.partName),
          },
        }));
      }
    }
  }, [data]);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (noData) {
    return <div>No data available</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Asset Utilisation - Pie Chart
        </Typography>

        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={400}
        />
      </Paper>
    </Box>
  );
};

export default AssetsUtilisationPieChart;
