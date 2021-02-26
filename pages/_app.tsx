import 'styles/globals.scss';
import 'semantic-ui-css/semantic.min.css';
import 'firebase/firestore';
import 'firebase/auth';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import { Fuego } from 'utils/fuego';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FunctionComponent } from 'react';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const fuego = new Fuego(firebaseConfig);

const MyApp: FunctionComponent<AppProps> = (props) => {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>HELPq</title>
                <meta name='theme-color' content='#4c9cd2' />
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width'
                />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;700&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <FuegoProvider fuego={fuego}>
                <Component {...pageProps} />
            </FuegoProvider>
        </>
    );
};

export default MyApp;
