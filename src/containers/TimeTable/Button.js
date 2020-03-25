import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from "../../store/MoviesInfo/actions";
import '../../components/EditingSessions/ChoseTime.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'
import {
    Link,
} from "react-router-dom";
import cn from "classnames";

class TimeButton extends Component {
    state = {
        id: this.props.id,
        time: this.props.time,
        date: this.props.date,
    };

    deleteTime = async () => {
        console.log('id: ', this.state.id, 'time: ', this.state.time, "date: ", this.state.date);
        let response = await fetch('/api/deletetime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: this.state.id,
                time: this.state.time.slice(0, 5) + ':00',
                date: this.state.date,
            })
        });
        let resalt = await response.json();
        console.log(resalt);
        this.props.dispatch(Actions.deleteTime(this.state.time, this.state.date, this.state.id))
    };


    render() {
        return (<Fragment key={this.props.time.slice(0, 5)}>
                {!this.props.isAdmin ?

                    <button className={cn({
                        'btn-time-dark': this.props.isDark,
                        'btn-time-white': !this.props.isDark,
                    })}
                    >{this.props.time.slice(0, 5)}
                    </button>
                    :
                    <button className={cn({
                        'btn-time-dark-admin': this.props.isDark,
                        'btn-time-white-admin': !this.props.isDark,
                    })} onClick={this.deleteTime}
                    >{this.props.time.slice(0, 5)}
                        {this.props.isAdmin ? <i className="im im-x-mark btn-delete-time pointer"/> : ''}
                    </button>
                }
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        times: Selectors.getTimesOneMovie(state),
    };
}

export default connect(mapStateToProps)(TimeButton);





