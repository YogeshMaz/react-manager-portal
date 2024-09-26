// OpenRfqs.js
import React from 'react';
import Table from '../../../components/tables/DataTablesV1';
import { openRfqsColumnsV1 } from '../../../components/columns/AllColumnsV1';
import useFetchReportData from '../../../components/hooks/fetchReportData';
import NodataImage from "../../../images/noData1.jpg";
import { CircularProgress, Typography } from '@mui/material';
import { APILinkRoutes } from '../../../components/apiLinks/APILinkRoutes';

const OpenRfqs = () => {
  const { data, error, noData, isLoading } = useFetchReportData(APILinkRoutes.OpenRFQsRoute);

  return (
    <div>
      {/* Show a loading spinner while data is being fetched */}
      {isLoading && <center><CircularProgress /></center>}

      {/* Error handling */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* Show a "No Data Available" image if no data is returned */}
      {noData && !isLoading && (
        <center>
          <img src={NodataImage} alt="No Data Available" style={{ maxWidth: '100%', height: 'auto' }} />
          <Typography>No Data Available!</Typography>
        </center>
      )}

      {/* Render table if data is available and no errors */}
      {!isLoading && !error && !noData && <Table data={data} columns={openRfqsColumnsV1} />}
    </div>
  );
};

export default OpenRfqs;
