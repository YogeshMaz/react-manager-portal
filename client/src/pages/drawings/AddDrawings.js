import React from "react";
import ZohoIframe from "../utilities/ZohoIframe";
import { APILinkRoutes, RouteTitles } from "../../components/apiLinks/APILinkRoutes";

export default function AddDrawings() {
  return (
    <center>
      {/* <h1>Add Drawings</h1> */}
      <ZohoIframe srcUrl={APILinkRoutes.AddDrawingRoute} title={RouteTitles.AddDrawingRouteTitle} />
    </center>
  );
}
