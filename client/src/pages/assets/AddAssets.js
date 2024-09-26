//AddAssets.js 
import React from "react";
import ZohoIframe from "../utilities/ZohoIframe";
import { APILinkRoutes, RouteTitles } from "../../components/apiLinks/APILinkRoutes";

export default function AddAssets() {
  return (
    <center>
      <ZohoIframe srcUrl={APILinkRoutes.AddAssetsRoute} title={RouteTitles.AddAssetRouteTitle} />
    </center>
  );
}

