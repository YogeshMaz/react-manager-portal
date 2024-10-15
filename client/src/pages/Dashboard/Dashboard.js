import DashboardBox from "../Dashboard/DashboardBox";
import * as React from "react";
import { TbTruckDelivery, TbHeartHandshake } from "react-icons/tb";
import { RxDrawingPin } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import {
  MdOutlineRequestQuote,
  MdOutlineSpaceDashboard,
  MdOutlineHighQuality,
  MdOutlineReceiptLong,
  MdOutlinePreview,
  MdOutlineGroup,
  MdOutlineRemoveRedEye,
  MdWebAsset,
  MdOutlineInventory,
} from "react-icons/md";
// import usefetchCustomAPIData from "../../components/hooks/fetchCustomAPI";
import useFetchReportData from "../../components/hooks/fetchReportData";
import { APILinkRoutes } from "../../components/apiLinks/APILinkRoutes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Dashboard = () => {
  const { data, error, noData } = useFetchReportData(
    APILinkRoutes.summaryRoute
  );

  // console.log("dash data ", data[0])

  const eData = data[0];

  const location = useLocation();

  const renderSkeleton = () => (
    <Box mt={2}>
      {/* Full-width header skeleton with same height as columns */}
      <Box width="100%">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </Box>
      <br></br>
      {/* Simulating multiple rows with 4 columns */}
      {[...Array(2)].map((_, rowIndex) => (
        <Box
          key={rowIndex}
          display="flex"
          justifyContent="space-between"
          mb={1}
        >
          <Skeleton variant="rectangular" width="22%" height={50} />
          <Skeleton variant="rectangular" width="22%" height={50} />
          <Skeleton variant="rectangular" width="22%" height={50} />
          <Skeleton variant="rectangular" width="22%" height={50} />
        </Box>
      ))}
    </Box>
  );

  if (error) return <div>Error: {error}</div>;
  if (noData) return <div>No data available</div>;
  if (!data) return <div>{renderSkeleton()}</div>; // Handle the case where data is still being fetched

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-12 mt-2">
            <div className="welcome_alert">
              <h5>
                <TbHeartHandshake fontSize={26} /> Welcome to Manager Portal !
              </h5>
            </div>
            <div className="dashboardBoxWrapper d-flex">
              <div className="dashboardBox">
                <Link to="/customer-rfqs">
                  <DashboardBox
                    icon={<MdOutlineGroup />}
                    content={["Customer RFQs"]}
                    // title={data?.rfq_summary_details?.total_customer_rfqs}
                    title={eData?.customer_rfq_ids1?.split(",")?.length}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/rfq-dashboard">
                  <DashboardBox
                    icon={<MdOutlineSpaceDashboard />}
                    content={["RFQ Floated"]}
                    title={eData?.total_rfq_counts}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/view-drawings">
                  <DashboardBox
                    icon={<MdOutlineRemoveRedEye />}
                    content={["View Drawings"]}
                    title={63}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/upcoming-deliveries">
                  <DashboardBox
                    icon={<TbTruckDelivery />}
                    content={["Upcoming Deliveries"]}
                    title={
                      eData?.total_upcoming_deliveries
                    }
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/quality-check">
                  <DashboardBox
                    icon={<MdOutlineHighQuality />}
                    content={["Quality Check"]}
                    title={eData?.total_quality_check}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/vendor-pos">
                  <DashboardBox
                    icon={<MdOutlineInventory />}
                    content={["Vendor POs"]}
                    title={eData?.total_vendor_pos}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/vendor-invoices">
                  <DashboardBox
                    icon={<MdOutlineReceiptLong />}
                    content={["Vendor Invoices"]}
                    title={eData?.total_vendor_invoices}
                  />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/view-payments">
                  <DashboardBox
                    icon={<MdOutlinePreview />}
                    content={["Request / View Payments"]}
                    title={eData?.total_view_payments}
                  />
                </Link>
              </div>
              {/* <DashboardBox icon={<MdOutlineRequestQuote/>} content={["Partner RFQ Response"]} title={data.rfq_summary_details.total_partner_rfq_responses} /> */}
              {/* <DashboardBox icon={<RxDrawingPin/>} content={["Add Drawings"]} />
                            <DashboardBox icon={<MdOutlineRemoveRedEye/>} content={["View Drawings"]} />
                            <DashboardBox icon={<MdWebAsset/>} content={["Add Assets"]} />
                            <DashboardBox icon={<MdOutlinePreview/>} content={["View Assets"]} />
                            <DashboardBox icon={<MdOutlineSpaceDashboard/>} content={["Assets Utilisation"]} />
                            <DashboardBox icon={<FiPlusSquare/>} content={["Add Visit"]} />
                            <DashboardBox icon={<MdOutlineRemoveRedEye/>} content={["View Visit"]} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
