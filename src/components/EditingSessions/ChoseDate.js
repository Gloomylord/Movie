import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from "../../store/MoviesInfo/actions";
import './ChoseTime.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'
import cn from "classnames";
import ChoseTimes from "./ChoseTimes";

class ChoseDate extends Component {
    state = {
        date: '0000-00-00',
    };

    onChange = (e) => {
        this.setState({date: e.target.value});
    };

    checkDateIsExpired = (checkDate) => {
        let date_time = new Date();
        let date = new Date(
            date_time.getUTCFullYear(),
            date_time.getUTCMonth(),
            date_time.getUTCDate(),
            0, 0, 0, 0);
        let newDate = new Date(checkDate);
        if (newDate - date >= 0) {
            return true
        } else {
            return false
        }

    };

    addDate = () => {
        if (this.state.date) {
            console.log(this.state.date);
            let start = true;
            this.props.datetimes.forEach((value) => {
                if (value.date === this.state.date) {
                    start = false;
                }
            });
            if (this.checkDateIsExpired(this.state.date) && start) {
                this.props.dispatch(Actions.addDateTimeOneMovie(null, this.state.date));
            } else {
                if (!start) {
                    this.props.showMessage('Такая дата уже добавлена');
                } else {
                    let date_time = new Date();
                    this.props.showMessage('Дата должна быть после ' + date_time.getUTCFullYear() + '-' + date_time.getUTCMonth() + '-' + (date_time.getUTCDate() - 1));
                }
            }
            this.setState({date: '0000-00-00'});
        } else {
            this.props.showMessage('Сперва выберите дату');
        }
    };

    choseUniqueDate = () => {
        let dates = new Set();
        this.props.datetimes.forEach(value => {
            if(this.checkDateIsExpired(value.date)){
                dates.add(value.date);
            }
        });
        return Array.from(dates);
    };

    render() {

        return <>
            {this.props.isAdmin ?
                <div className=' text-color-main data-time'>
                    <div className='date'>
                        <div className={cn('input-time center', {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark
                        })}>Добавить дату:
                        </div>
                        <input value={this.state.date} onChange={this.onChange}
                               className='add-movie-input date time-pos' type='date'/>
                        <button key='will add' className='btn-change-some  btn-time-add pointer none-margin'
                                onClick={this.addDate}>
                            <i key='will add' className="im im-plus time-add"/>
                        </button>
                    </div>
                    {this.props.datetimes ? this.choseUniqueDate().map((value) =>
                        <ChoseTimes
                            key={value}
                            date={value}
                            movieInfo={this.props.movieInfo}
                            showMessage={this.props.showMessage}
                        />
                    ) : null}
                </div>
                :
                <div className=' text-color-main data-time'>
                    {this.props.datetimes ? this.choseUniqueDate().map((value) =>

                        <ChoseTimes
                            key={value}
                            date={value}
                            movieInfo={this.props.movieInfo}
                            showMessage={this.props.showMessage}
                        />
                    ) : null}
                </div>
            }
        </>
    }
}

function mapStateToProps(state) {
    return {
        datetimes: Selectors.getTimesOneMovie(state),
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(ChoseDate);





