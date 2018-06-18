import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloProvider
} from "react-apollo";
import {
    ApolloClient
} from "apollo-client";
import {
    HttpLink
} from "apollo-link-http";
import {
    InMemoryCache
} from 'apollo-cache-inmemory'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer 1781062dc9d3e4100c32393a7b7e90098f060fca`
    }
})

const cache = new InMemoryCache()
const client = new ApolloClient({
    link: httpLink,
    cache,
})

ReactDOM.render( 
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root')
);
registerServiceWorker();
