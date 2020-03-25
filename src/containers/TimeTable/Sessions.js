import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import '../../components/EditingSessions/ChoseTime.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'
import cn from "classnames";
import Button from "./Button";

class Sessions extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
    };

    render() {
        return (
            <div className=' text-color-main data-time-1'>
                <div className={cn('date-style', {
                    'text-color-date-dark': this.props.isDark,
                    'text-color-main-white': !this.props.isDark
                })}>Сеансы
                </div>
                <div className='time-div'>
                    {this.props.times.length > 0 &&
                    this.props.times.map((value) => {
                        if (value.movieId === this.state.id && value.date === this.state.date) {
                            return <Button time={value.time}
                                           key={value.time}
                                           date={value.date}
                                           id={this.state.id}/>
                        }
                    })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        times: Selectors.getTimes(state),
    };
}

export default connect(mapStateToProps)(Sessions);





