export {};

import React from 'react';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

const Head: React.FC<{ seoInfo: any }> = (props) => {
  const gtmScript = `(function(w,d,s,l,i) {
    w[l]=w[l]||[];
    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5B2TD9P');`;

  return (
    <>
      <DefaultSeo {...props.seoInfo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2d86a5bb30f44d2db3564aa2962bb093"
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        {/* End Google Tag Manager */}
      </NextHead>
    </>
  );
};

export default Head;


// Updated head due to errors
