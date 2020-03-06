import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import GetMovie from "../components/GetMovie";
import MovieInfo from "../components/MovieInfo";
import {
    Switch,
    Route,
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import TimeTable from "./TimeTable";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/MainPart.css'


class MainPart extends Component {

    render() {
        console.log('this:', this.props);
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
                        <div className='text-color-main'>Здесь будет резервация и просмотр доступных билетов</div>
                    </Route>
                    <Route path={`/timetable`} exact>
                        <TimeTable/>
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
