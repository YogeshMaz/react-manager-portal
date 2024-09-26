const LOCALHOST = process.env.REACT_APP_LOCALHOST;

const APILinkRoutes = {
    /** Dashboard */
    summaryRoute: LOCALHOST + "/api/summary/details",

    /** Assets */
    AddAssetsRoute: "https://creatorapp.zohopublic.in/arun.ramu_machinemaze/asset-management/form-embed/Add_Assets/m1hNSseRsSBySsxPKwdUNsbNUCOBymWh2HuvRnSbGzCGsrvHVe7CteeXmSJX00uvhfQP4vSbEveyG1aJsEPr06B6O8HPv4sXJUXT",
    ViewAssetsRoute: LOCALHOST + "/api/asset/view_assets",
    AssetsUtilisationRoute: "https://creatorapp.zohopublic.in/arun.ramu_machinemaze/asset-management/report-embed/Asset_Utilization/U59t32X6zqMhfYuVXuYmBAR2zH18r2aAeCMY7R4bw5nktu5DfgVrQjgpR6dZDG9p7SEpKD83dGrBhFa8zH5N12CJeHdzpnCs5zev",

    /** Drawings */
    AddDrawingRoute: "https://creatorapp.zohopublic.in/arun.ramu_machinemaze/drawing-version-control/form-embed/Drawing_Version_Control/rMCuukHBwsr5AxYs65ZkuC2Y1a4gJRa23qGDzsjBg8AqYg6CAE5Rpq7my8DMRbzyrPqY1Yr5aPabRspzvZxNYEF2UA40BZk46BmV",
    ViewDrawingRoute: LOCALHOST + "/api/drawing/view_drawings",

    /**Project Management */
    /* Project Dashboard */
    OpenProjectsRoute: LOCALHOST + "/api/project_management/project_dashboard/open_projects",
    ProductionProjectsRoute: LOCALHOST + "/api/project_management/project_dashboard/completed_projects",
    OnHoldProjectsRoute: LOCALHOST + "/api/project_management/project_dashboard/on_hold_projects",
    CancelledProjectsRoute: LOCALHOST + "/api/project_management/project_dashboard/cancelled_projects",

    UpcomingDeliveriesRoute: LOCALHOST + "/api/project_management/upcoming_deliveries",
    QualityCheckRoute: LOCALHOST + "/api/project_management/quality_check",

    /** Purchase */
    VendorPosRoute: LOCALHOST + "/api/purchase/vendor_pos",
    VendorInvoicessRoute: LOCALHOST + "/api/purchase/vendor_invoices",
    RequestViewPaymentsRoute: LOCALHOST + "/api/purchase/req_view_payments",

    /**RFQ Management */
    /* RFQ Dashboard */
    OpenRFQsRoute: LOCALHOST + "/api/rfq_management/rfq_dashboard/open_rfqs",
    PostRFQsRoute: LOCALHOST + "/api/rfq_management/rfq_dashboard/post_evaluation_rfqs",
    OnHoldRFQsRoute: LOCALHOST + "/api/rfq_management/rfq_dashboard/on_hold_rfqs",
    ClosedRfqsRoute: LOCALHOST + "/api/rfq_management/rfq_dashboard/cancelled_closed_rfqs",
    AddRfqsRoute: LOCALHOST + "/api/rfq_management/rfq_dashboard/add_rfqs",
    CustomerRFQsRoute: LOCALHOST + "/api/rfq_management/customer_rfqs",
    PartnerRfqResponsesRoute: LOCALHOST + "/api/rfq_management/partner_rfq_responses",
};

const RouteTitles = {
    /** Dashbaord */
    SummaryRouteTitle: "Dashboard",

    /** Assets */
    AddAssetRouteTitle: "Add Assets",
    ViewAssetsRouteTitle: "View Assets",
    AssetsUtilisationRouteTitle: "Asset Utilisation",

    /** Drawings */
    AddDrawingRouteTitle: "Add Drawing",
    ViewDrawingRouteTitle: "View Drawings",

    /**Project Management */
    /* Project Dashboard */
    OpenProjectsRouteTitle: "Open Projects",
    ProductionProjectsRouteTitle: "Production Projects",
    OnHoldProjectsRouteTitle: "On Hold Projects",
    CancelledProjectsRouteTitle: "Cancelled Projects",

    UpcomingDeliveriesRouteTitle: "Upcoming Deliveries",
    QualityCheckRouteTitle: "Quality Check",

    /** Purchase */
    VendorPosRouteTitle: "Vendor POs",
    VendorInvoicessRouteTitle: "Vendor Invoices",
    RequestViewPaymentsRouteTitle: "View Payments",

    /**RFQ Management */
    /* RFQ Dashboard */
    OpenRFQsRouteTitle: "Open RFQs",
    PostRFQsRouteTitle: "Post Evaluation RFQs",
    OnHoldRFQsRouteTitle: "On Hold RFQs",
    ClosedRfqsRouteTitle: "Closed RFQs",

    CustomerRFQsRouteTitle: "Customer RFQs",
    PartnerRfqResponsesRouteTitle: "Partner RFQ Responses",
};

module.exports = { APILinkRoutes, RouteTitles };
