import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloProvider
} from "react-apollo";
import {
    ApolloClient
} from "apollo-client";
import {
    ApolloLink
} from 'apollo-link';

import {
    HttpLink
} from "apollo-link-http";
import {
    onError
} from 'apollo-link-error';

import {
    InMemoryCache
} from 'apollo-cache-inmemory'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: 'Bearer d485d75efe9cd80d1c8f8cc5c4af58cd573edf73'
    }
})

const errorLink = onError(({
    graphQLErrors,
    networkError
}) => {
    if (graphQLErrors) {
        // do something with graphql error
    }

    if (networkError) {
        // do something with network error
    }
});
const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache()
const client = new ApolloClient({
    link: link,
    cache,
})


ReactDOM.render( 
    <ApolloProvider client={client}>
        <div className="container my-3">
            <App />
        </div>
    </ApolloProvider>, 
    document.getElementById('root')
    
);
registerServiceWorker();
