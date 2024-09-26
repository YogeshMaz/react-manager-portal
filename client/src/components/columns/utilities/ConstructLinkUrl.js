import AttachmentLink from "./AttachmentLink";

export function constructLinkUrl(
  ZohoLinkUrl,
  appName,
  reportName,
  recordId,
  fieldName,
  publishedUrl
) {
  const linkUrl =
    ZohoLinkUrl !== "-"
      ? `https://creatorapp.zohopublic.in/file/arun.ramu_machinemaze/${appName}/${reportName}/${recordId}/${fieldName}/image-download/${publishedUrl}?${
          ZohoLinkUrl.split("?")[1]
        }`
      : "-";

  return (
    <div>
      <AttachmentLink attachmentUrl={linkUrl} /> {/* Update to match `attachmentUrl` */}
    </div>
  );
}
