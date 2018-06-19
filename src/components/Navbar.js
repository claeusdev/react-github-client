import React from 'react'
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

import Profile from './Profile'
import Homepage from './Homepage'

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Gitty</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                
            </ul>
        </div>
    </nav> 
)
    
export default Navbar