export default function DownloadableLink(imageZohoUrl, appName, reportname, fieldName, publishUrl, ID){
    const imageUrl = imageZohoUrl !== "-" ? (
        "https://creatorapp.zohopublic.in/file/arun.ramu_machinemaze/drawing-version-control/Drawings/"
        + row.original.ID + "/Upload_Image/image-download/8BJZJZ90CP2H47jDUNrfOVk5wsY4d4kBQb4g7U7axsYUs297Ozqmsfq2dXN8ewfO0N85vzhFUQZaaSBjtMx6hGWkz6VVuPd4y81n?"
        + imageZohoUrl.split("?")[1] || "-"
      ) : "-";
    return imageUrl;
}