import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import loader from "../components/loader";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <style>
                        {loader}
                    </style>
                </Head>
                {/* body */}

                <body>
                <div id={'globalLoader'}>
                    <div className="loader">
                        <div/>
                        <div/>
                    </div>
                </div>
                <Main/>
                <NextScript/>
                </body>
                
                {/* body */}
            </Html>
        )
    }
}

export default MyDocument