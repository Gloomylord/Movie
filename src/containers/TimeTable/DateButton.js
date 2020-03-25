import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from "classnames";

class DateButton extends Component {

    state = {
        date: this.props.date
    };

    selectDate = () => {
        if (this.props.selectDate !== this.state.date) {
            this.props.dispatch(Actions.changeDate(this.state.date));
        }
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.date!==this.state.date){
            this.setState({
                date: nextProps.date
            })
        }
    }

    render() {
        return <div className={cn('date-div', {
            'date-div-dark': this.props.isDark && !(this.props.selectDate === this.state.date),
            'date-div-white': !this.props.isDark && !(this.props.selectDate === this.state.date),
            'date-div-dark-select': this.props.isDark && this.props.selectDate === this.state.date,
            'date-div-white-select': !this.props.isDark && this.props.selectDate === this.state.date,
        })}
                    onClick={this.selectDate}>
            <div className={cn('pointer', {
                'text-color-date-dark': this.props.isDark,
                'text-color-main-white': !this.props.isDark
            })}>{this.props.date.slice(5)}</div>
            <div className={cn('pointer', {
                'text-color-date-dark': this.props.isDark,
                'text-color-main-white': !this.props.isDark
            })}>{this.props.day}</div>

        </div>

    }
}

function mapStateToProps(state) {
    return {
        datetimes: Selectors.getTimes(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        movies: Selectors.getMovies(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        selectDate: Selectors.selectDate(state),
    };
}

export default withRouter(connect(mapStateToProps)(DateButton));





