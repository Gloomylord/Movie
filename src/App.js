import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopMenu from './containers/TopMenu';
import MainPart from "./containers/MainPart";
import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {

    showMessage = (str, className) => {
        if(className) {
            toast(str, {
                className: className
            });
        } else {
            toast.info(str);
        }

    };

    render() {
        return (
            <div className="App">
                <TopMenu/>
                <MainPart showMessage={this.showMessage}/>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}   />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(App);
