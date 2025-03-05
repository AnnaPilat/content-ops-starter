import * as React from 'react';
import classNames from 'classnames';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

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

            <script
                async
                src="https://stage-widget.intelswift.com/script.js?tenantId=835c3375-8bff-4f6b-94d0-dbbd537f5303&botId=67c82ae56381d68d8e0e491e&uuid=70907f9c-aaec-43dc-a0d4-7d82108c376a&end=true"
            ></script>

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.onload = function(event) {
                            const propsInterval = setInterval(widgetTimer, 1000);

                            function widgetTimer() {
                                const tenantId = localStorage.getItem("wws-tenant-id");
                                const botId = localStorage.getItem("wws-bot-id");
                                const uuid = localStorage.getItem("wws-uuid");
                                const host = window.location.hostname;
                                const language = navigator.language || navigator.userLanguage; 

                                if (
                                    (uuid && uuid !== "undefined") && 
                                    (tenantId && tenantId !== "undefined") && 
                                    (botId && botId !== "undefined") && 
                                    (host && host !== "undefined")
                                ) {
                                    clearInterval(propsInterval);
                                    document.getElementById("iframeWidgetContainer")?.contentWindow.postMessage(
                                        {
                                            tenantId: tenantId,
                                            botId: botId,
                                            uuid: uuid,
                                            host: host,
                                            contact_language: language
                                        }, "*"
                                    );
                                }
                            }
                        };
                    `,
                }}
            />
        </div>
    );
}
