import * as React from 'react';
import classNames from 'classnames';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import Script from 'next/script'; // ✅ Правильний імпорт для скриптів у Next.js

export default function DefaultBaseLayout(props) {
    const { page, site } = props;
    const { enableAnnotations = true } = site;
    const pageMeta = page?.__metadata || {};

    return (
        <div className={classNames('sb-page', pageMeta.pageCssClasses)} {...(enableAnnotations && { 'data-sb-object-id': pageMeta.id })}>
            <div className="sb-base sb-default-base-layout">
                {site.header && <Header {...site.header} enableAnnotations={enableAnnotations} />}
                {props.children}
                {site.footer && <Footer {...site.footer} enableAnnotations={enableAnnotations} />}
            </div>

            {/* ✅ Додаємо зовнішній скрипт коректно */}
            <Script
             async src="https://stage-widget.intelswift.com/script.js?tenantId=3a64cd11-b987-407a-bfe8-7395f34ffab1&botId=67c96c606381d68d8e0e5e8a&uuid=ec143e14-19ce-49f9-992e-6113043a7bcb&end=true"
                strategy="afterInteractive"
            />

            {/* ✅ Додаємо inline-скрипт через dangerouslySetInnerHTML */}
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
                    `,
                }}
            />
        </div>
    );
}
