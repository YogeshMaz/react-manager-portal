// PartnerRfqResponse.js
import Table from '../../components/tables/DataTablesV1';
import { PartnerRfqResponseColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from "../../components/hooks/fetchReportData";
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const PartnerRFQs = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.PartnerRfqResponsesRoute);

  return (
      <div>
        {error && <div>Error: {error}</div>}
        {noData && <div>No data available</div>}
        {!error && !noData && <Table data={data} columns={PartnerRfqResponseColumnsV1} Title={RouteTitles.PartnerRfqResponsesRouteTitle}/>}
      </div>
  );
};

export default PartnerRFQs;
