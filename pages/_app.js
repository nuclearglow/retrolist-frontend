import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';

import '../components/styles/nprogress.css';
import '../components/styles/terminal.css';

import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});
Router.events.on('routeChangeError', () => {
    NProgress.done();
});

// Component and pageProps come from react, apollo  from withData
const MyApp = ({ Component, pageProps, apollo }) => (
    // ApolloProvider: https://reactjs.org/docs/context.html
    <ApolloProvider client={apollo}>
        <Page>
            <Component {...pageProps} />
        </Page>
    </ApolloProvider>
);

// SSR: customize Next https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
};

// wrap withData -> withApollo to get the apollo context
export default withData(MyApp);
