import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Typography, LinearProgress, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Table = ({
  data,
  columns,
  Title,
  isLoading, // Pass this prop to indicate loading status
  initialState = { density: "compact" },
}) => {
  const renderSkeleton = () => (
    <Box mt={2}>
      {/* Simulating a header skeleton */}
      <Skeleton variant="text" width="20%" height={30} />
      {/* Simulating multiple rows with columns */}
      {[...Array(10)].map((_, rowIndex) => (
        <Box key={rowIndex} display="flex" justifyContent="space-between" mb={1}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      ))}
    </Box>
  );

  return (
    <div className="right-content w-100">
      <Typography variant="h5" className="headTxt">
        {Title}
      </Typography>

      {isLoading ? (
        // Show loader while data is loading
        <Box sx={{ width: "100%", padding: "10px" }}>
          <LinearProgress />
        </Box>
      ) : data.length === 0 ? (
        // Show a skeleton if no data is available
        <Typography variant="body1" align="center" color="textSecondary">
          {renderSkeleton()}
        </Typography>
      ) : (
        // Show the table when data is available
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
