import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopMenu from './containers/TopMenu';
import MainPart from "./containers/MainPart";

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopMenu/>
                <MainPart/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(App);
