import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "zsiqscript";
    script.defer = true;
    script.src = "https://salesiq.zohopublic.in/widget";

    // Optional: set the Zoho SalesIQ settings before appending the script
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode: "siqd7d2a66d6dbb92722a3b8281e349d205bf1b586e06fc7d82c794e5d35000b1a0",
      values: {},
      ready: function() {
        // Custom logic if needed after the chat widget is ready
      },
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script if component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null; // The component itself doesn't render anything.
}
