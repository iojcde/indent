import Document, { Html, Main, NextScript, Head } from 'next/document';

class MyDocument extends Document {
	// Only uncomment if you need to customize this behaviour
	// static async getInitialProps(ctx: DocumentContext) {
	//   const initialProps = await Document.getInitialProps(ctx)
	//   return {...initialProps}
	// }
	render() {
		return (
			<Html lang="en">
				<Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />
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
