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
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${process.env.PERSONAL_TOKEN}`
    }
})

const cache = new InMemoryCache()
const client = new ApolloClient({
    link: httpLink,
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
