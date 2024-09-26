import ImageLink from "./ImagedLink";
export function constructImageUrl(
  imageZohoUrl,
  appName,
  reportName,
  recordId,
  fieldName,
  publishedUrl,
) {
  const imageUrl =
    imageZohoUrl !== "-"
      ? `https://creatorapp.zohopublic.in/file/arun.ramu_machinemaze/${appName}/${reportName}/${recordId}/${fieldName}/image-download/${publishedUrl}?${
          imageZohoUrl.split("?")[1]
        }`
      : "-";

  return (
    <div>
      <ImageLink imageUrl={imageUrl} />
    </div>
  );
}

//     const imageUrl =
// imageZohoUrl !== "-"
// ? "https://creatorapp.zohopublic.in/file/arun.ramu_machinemaze/drawing-version-control/Drawings/" +
//     row.original.ID +
//     "/Upload_Image/image-download/8BJZJZ90CP2H47jDUNrfOVk5wsY4d4kBQb4g7U7axsYUs297Ozqmsfq2dXN8ewfO0N85vzhFUQZaaSBjtMx6hGWkz6VVuPd4y81n?" +
//     imageZohoUrl.split("?")[1] || "-"
// : "-";
