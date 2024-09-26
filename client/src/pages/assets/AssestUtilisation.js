// import React from "react";
// import ZohoIframe from "../utilities/ZohoIframe";
// import { APILinkRoutes, RouteTitles } from "../../components/apiLinks/APILinkRoutes";

// export default function AssetsUtilisation() {
//   return (
//     <center>
//       <h1>Asset Utilisation</h1>
//       {/* <ZohoIframe srcUrl={APILinkRoutes.AssetsUtilisationRoute}  title={RouteTitles.AssetsUtilisationRouteTitle} ></ZohoIframe> */}
      
//     </center>
//   );
// }
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Box, Paper, Typography } from '@mui/material';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes } from '../../components/apiLinks/APILinkRoutes';
import AssetsUtilisationPieChart from './AssetsUtilisationPieChart';

const AssetsUtilisation = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.ViewAssetsRoute);
  
  // Initial chart data setup
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false, // Hide unnecessary toolbar
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,  // Set to false for vertical bars
          columnWidth: '80%', // Adjusted width for rectangular bars
          borderRadius: 0,    // No border radius for sharp rectangular look
        },
      },
      dataLabels: {
        enabled: false,  // Disable data labels on the chart
      },
      xaxis: {
        categories: [],  // Part names go here
        title: {
          text: 'Part Names',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        labels: {
          rotate: -45,  // Rotate labels for readability if there are many parts
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Quantity',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        min: 0,
        max: 500000,  // Fixed y-axis range
      },
      grid: {
        show: true,  // Display grid lines
        borderColor: '#E0E0E0', // Subtle color for grid lines
        strokeDashArray: 5,     // Dashed grid lines for better visibility
      },
      colors: ['#82CA9D', '#FF7300', '#8884D8'], // Use consistent, clean color palette
      legend: {
        position: 'top',          // Legend at the top
        horizontalAlign: 'center', // Centered legend for balance
        markers: {
          radius: 12,             // Rounded legend markers
        },
        itemMargin: {
          horizontal: 10,         // Add space between legend items
          vertical: 5,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} units`,  // Display quantity units in tooltip
        },
      },
    },
  });

  // Data transformation and setting chart state
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => ({
        partName: item.PART_NAME,
        patternLifeQty: parseInt(item.PATTERN_LIFE_QTY) || 0,
        productionCompleteQty: parseInt(item.NO_OF_PRODUCTION_COMPLETE_QTY) || 0,
        balanceProductionQty: parseInt(item.BALANCE_PRODUCTION_QTY) || 0,
      }));
      
      // Check if any actual data to process
      if (formattedData.length > 0) {
        setChartData((prev) => ({
          ...prev,
          series: [
            {
              name: 'PATTERN_LIFE_QTY',
              data: formattedData.map((item) => item.patternLifeQty),
            },
            {
              name: 'NO_OF_PRODUCTION_COMPLETE_QTY',
              data: formattedData.map((item) => item.productionCompleteQty),
            },
            {
              name: 'BALANCE_PRODUCTION_QTY',
              data: formattedData.map((item) => item.balanceProductionQty),
            },
          ],
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories: formattedData.map((item) => item.partName),  // Part names for x-axis
            },
          },
        }));
      }
    }
  }, [data]); // Ensure it runs only when 'data' is updated

  // If there is an error or no data
  if (error) {
    return <div>Error loading data</div>;
  }
  if (noData) {
    return <div>No data available</div>;
  }

  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Asset Utilisation
        </Typography>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </Paper>
    </Box>
    <AssetsUtilisationPieChart/>
    </>
  );
};

export default AssetsUtilisation;
