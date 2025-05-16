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
                src="https://stage-widget.intelswift.com/script.js?tenantId=adf93120-af03-428d-8c62-8b1c29eac370&botId=67dd405be0571ec8772d30a6&uuid=94edbae1-1192-4fa7-8ff2-4cb3dced935d&end=true"
                strategy="afterInteractive"
            />

            {/* Inline-скрипт */}
            <Script
                id="widget-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.onload = () => {
                            const propsInterval = setInterval(widgetTimer, 1000);
                            function widgetTimer() {
                                const tenantId = localStorage.getItem("wws-tenant-id");
                                const botId = localStorage.getItem("wws-bot-id");
                                const uuid = localStorage.getItem("wws-uuid");
                                const host = window.location.hostname;
                                const language = navigator.language || navigator.userLanguage;

                                if (uuid && tenantId && botId && host) {
                                    clearInterval(propsInterval);
                                    document.getElementById("iframeWidgetContainer")?.contentWindow?.postMessage({
                                        tenantId,
                                        botId,
                                        uuid,
                                        host,
                                        contact_language: language
                                    }, "*");
                                }
                            }
                        };
                    `,
                }}
            />
        </div>
    );
}
