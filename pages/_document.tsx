import {getCssText} from '@root/stitches.config';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&family=Poppins:wght@400;600&display=swap'
            rel='stylesheet'
          />
          <style id='stitches' dangerouslySetInnerHTML={{__html: getCssText()}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
