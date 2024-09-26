import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Typography, LinearProgress, Box } from "@mui/material";

const Table = ({
  data,
  columns,
  Title,
  isLoading, // Pass this prop to indicate loading status
  initialState = { density: "compact" },
}) => {
  return (
    <div className="right-content w-100">
      <Typography variant="h5" className="headTxt">
        {Title}
      </Typography>

      {isLoading ? (
        // Show LinearProgress loader while data is loading
        <Box sx={{ width: "100%", padding: "10px" }}>
          <LinearProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          <Box sx={{ width: "100%", padding: "10px" }}>
            <LinearProgress />
            Loading...
          </Box>
        </Typography>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={initialState}
        />
      )}
    </div>
  );
};

export default Table;
