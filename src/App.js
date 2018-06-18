import React, { Component } from 'react';
import Profile from './components/Profile'

import './App.css';

// const axiosGithubGraphQL = axios.create({
//   baseURL: 'https://api.github.com/graphql',
//   headers: {
//     Authorization: 'bearer 1781062dc9d3e4100c32393a7b7e90098f060fca',
//   },
// })



class App extends Component {
  render() {
    return (
      <Profile />
    );
  }
}

export default App;
