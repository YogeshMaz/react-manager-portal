import React from "react";

export default function ZohoIframe({ srcUrl, title }) {
  return (
    <iframe
      src={srcUrl}
      title={title}
      scrolling="auto"
      allowtransparency="true"
      frameborder="0"
      width="100%"
      height="820px"
    ></iframe>
  );
}
