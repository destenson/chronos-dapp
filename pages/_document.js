import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import stylesheet from 'styles/index.scss';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage();
    return {
      html, head, errorHtml, chunks,
    };
  }


  render() {
    return (
      <html lang="en">
        <title>Chronologic chronos dapp</title>
        {<link rel="shortcut icon" href={process.env.BACKEND_URL + "/favicon.ico"} type="image/x-icon" />}
        <body>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
