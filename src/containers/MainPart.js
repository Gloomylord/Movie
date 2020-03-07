import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import GetMovie from "../components/GetMovie";
import MovieInfo from "../components/MovieInfo";
import {
    Switch,
    Route,
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import TimeTable from "./TimeTable";
import AboutUs from "../components/AboutUs";
import Reservation from "./Reservation";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/MainPart.css'




class MainPart extends Component {

    render() {
        return (
            <div className='main-style'>
                <Switch>
                    <Route path="/" exact>
                        <GetMovie/>
                    </Route>
                    <Route path="/movie" exact>
                        <GetMovie/>
                    </Route>
                    <Route path={`/movie/:topicId`} exact>
                        <MovieInfo>rgc45</MovieInfo>
                    </Route>
                    <Route path={`/movie/reservation/:topicId`}>
                        <Reservation/>
                    </Route>
                    <Route path={`/timetable`} exact>
                        <TimeTable/>
                    </Route>
                    <Route path={`/about_us`} exact>
                        <AboutUs/>
                    </Route>
                    <Route path={`/about_us`} exact>

                    </Route>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        routing: routerReducer,
        movieInfo: Selectors.getMovieInfo(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default withRouter(connect(mapStateToProps)(MainPart));
