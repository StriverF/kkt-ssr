import React from 'react';
import serialize from 'serialize-javascript';

export function InitData({ data, objectName }) {
  if (!data) return null;
  try {
    data = serialize({ ...data });
  } catch (error) {
    data = null;
  }
  if (!data) return null;
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.${objectName} = ${data};` }} />
  );
}

export function DocumentRoot() {
  return <div id="root">___SERVER_SSR_RENDER___</div>;
}

export class Document extends React.Component {
  static async getInitialProps({ assets, data, extractor, renderPage, store }) {
    // https://reacttraining.com/react-router/web/example/static-router
    // This example renders a route within a StaticRouter and populates its
    // staticContext, which it then prints out. In the real world you would
    // use the StaticRouter for server-side rendering:
    // staticContext
    const page = await renderPage({ ...data });
    return { assets, data, extractor, store, ...page };
  }

  render() {
    // eslint-disable-next-line
    const { helmet, assets, preloadAssets, data, store } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();
    return (
      <html lang="en" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && <link rel="stylesheet" type="text/css" href={assets.client.css} />}
          {preloadAssets && preloadAssets.css && preloadAssets.css.map((link, key) => {
            return <link key={key} rel="stylesheet" type="text/css" href={link} />;
          })}
          {preloadAssets && preloadAssets.js && preloadAssets.js.map((src, key) => {
            return <script key={key} type="text/javascript" src={src} async />;
          })}
        </head>
        <body {...bodyAttrs}>
          <DocumentRoot />
          {data && <InitData data={data} objectName="_KKT_SSR" />}
          {store && store.getState && <InitData data={store.getState()} objectName="_KKT_STORE" />}
          <script type="text/javascript" src={assets.client.js} async />
        </body>
      </html>
    );
  }
}
