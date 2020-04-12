import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import AddTime from "./AddTime";
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';

import './AddMovie.css'

class AddDate extends PureComponent {

    state = {
        date: '0000-00-00'
    };

    onChange = (e) => {
        let date_time = new Date();
        let date = new Date(date_time.getUTCFullYear(), date_time.getUTCMonth(), date_time.getUTCDate() + 1, 0, 0, 0, 0);
        let newDate = new Date(e.target.value);
        console.log('now: ', date_time, 'new: ', newDate, 'fgvhbj', newDate - date);
        console.log('only date: ', date);
        if (newDate - date >= 0) {
            this.setState({date: e.target.value});
        } else {
            this.props.showMessage('дата должна быть после '+date_time.getUTCFullYear()+'-'+ date_time.getUTCMonth()+'-'+ (date_time.getUTCDate()-1));
        }
    };

    addDate = () => {
        if (this.state.date) {
            this.props.addDate(this.state.date);
            this.setState({date: '0000-00-00'})
        } else {
            this.props.showMessage('Сперва выберите дату');
        }
    };

    render() {
        return (
            <>
                <div className=' text-color-main data-time'>
                    <div className='date'>
                        <div className='text-color-main input-name '>Добавить дату:</div>
                        <input value={this.state.date} onChange={this.onChange}
                               className='add-movie-input date time-pos' type='date'/>
                        <button key='will add' className='btn-change-some  btn-time-add pointer none-margin'
                                onClick={this.addDate}>
                            <i key='will add' className="im im-plus time-add"/>
                        </button>
                    </div>
                    {this.props.timetable.map((value) =>
                        <AddTime
                            key={value.date}
                            addTime={this.props.addTime}
                            showMessage={this.props.showMessage}
                            deleteTime={this.props.deleteTime}
                            deleteDate={this.props.deleteDate}
                            date={value.date}
                            times={value.times}
                        />
                    )}
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg,
        addMovie: Selectors.checkAddMovie(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(AddDate);