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
import AddMovie from "./AddMovie/AddMovie";
import cn from 'classnames'
import './styleFiles/MainPart.css'


class MainPart extends Component {

    render() {
        return (
            <div className={cn({
                'main-style-add-movie': this.props.addMovie,
                'main-style-dark': this.props.isDark,
                'main-style-white': !this.props.isDark
            })}>
                <Switch>
                    <Route path="/" exact>
                        {!this.props.addMovie ?
                            <GetMovie/> :
                            <AddMovie showMessage={this.props.showMessage}/>
                        }
                    </Route>
                    <Route path="/movie" exact>
                        {!this.props.addMovie ?
                            <GetMovie/> :
                            <AddMovie showMessage={this.props.showMessage}/>
                        }
                    </Route>
                    <Route path={`/movie/:topicId`} exact>
                        <MovieInfo showMessage={this.props.showMessage}/>
                    </Route>
                    <Route path={`/movie/reservation/:topicId`}>
                        <Reservation/>
                    </Route>
                    <Route path={`/timetable`} exact>
                        {!this.props.addMovie ?
                            <TimeTable/> :
                            <AddMovie showMessage={this.props.showMessage}/>
                        }

                    </Route>
                    <Route path={`/about_us`} exact>
                        <AboutUs/>
                    </Route>
                    <Route path={`/log_in_editing`} exact>
                        <div className='text-color-main'>Пока пусто</div>
                    </Route>
                    <Route>
                        <div className='text-color-main'>404</div>
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
        isAdmin: Selectors.checkIsAdmin(state),
        movieInfo: Selectors.getMovieInfo(state),
        showMsg: state.movieInfo.showMsg,
        addMovie: Selectors.checkAddMovie(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default withRouter(connect(mapStateToProps)(MainPart));
