import * as React from 'react';
import { useEffect } from 'react';
import Script from 'next/script';

export default function DefaultBaseLayout() {
useEffect(() => {
  const img = document.querySelector('img[alt="Full Screen"]');
  if (img) {
    (img as HTMLImageElement).style.setProperty('object-fit', 'contain', 'important');
    (img as HTMLImageElement).style.setProperty('width', '100%', 'important');
    (img as HTMLImageElement).style.setProperty('height', '100%', 'important');
  }
}, []);


    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <img
                src="/images/checkbox.jpg"
                alt="Full Screen"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // буде перезаписано через useEffect
            />

            {/* Зовнішній скрипт */}
            <Script
async src="https://widget.intelswift.com/script.js?tenantId=094f2d86-c31e-4a4c-b5b5-c890ee26399a&botId=6826a221b95e5d2c503d3e37&uuid=0e1dedcf-a678-4608-a75f-c244fb089a49&end=true"            />

            {/* Inline-скрипт */}
            <Script
                id="widget-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                       window.onload = (event) => {
    const propsInterval = setInterval(widgetTimer, 1000);

    function widgetTimer() {
      const tenantId = localStorage.getItem("wws-tenant-id")
      const botId = localStorage.getItem("wws-bot-id")
      const uuid = localStorage.getItem("wws-uuid")
      const host = window.location.hostname
      const language = navigator.language || navigator.userLanguage; 

      if(
        (uuid && uuid != "undefined") && 
        (tenantId && tenantId != "undefined") && 
        (botId && botId != "undefined") && 
        (host && host != "undefined")
      ){
        clearInterval(propsInterval);
        document.getElementById("iframeWidgetContainer").contentWindow.postMessage( 
        {
          tenantId: tenantId,
          botId: botId,
          uuid: uuid,
          host: host,
          contact_language: language
        },"*")
      }
    }
  };
  };
                    `,
                }}
            />
        </div>
    );

