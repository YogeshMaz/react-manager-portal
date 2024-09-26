import React from 'react';

const AttachmentLink = ({ attachmentUrl }) => {
  if (attachmentUrl === "-") {
    return (
      <b>-</b>
    )
  }

  return (
    <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">
      Download
    </a>
  );
};

export default AttachmentLink;
