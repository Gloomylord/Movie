import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import * as Selectors from "../store/MoviesInfo/reducer";
import {connect} from "react-redux";

const Checkbox = props => <input type="checkbox" {...props} />;

const options = [
    { value: 'зал 1', label: 'зал 1' },
    { value: 'зал 2', label: 'зал 2' },
    { value: 'зал 3', label: 'зал 3' }
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = 'black';
        return { ...provided, opacity, transition,color };
    }
};

class SingleSelect extends Component {
    state = {
        isSelected: true,
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
    };

    toggleClearable = () =>
        this.setState(state => ({ isClearable: !state.isClearable }));
    toggleDisabled = () =>
        this.setState(state => ({ isDisabled: !state.isDisabled }));
    toggleLoading = () =>
        this.setState(state => ({ isLoading: !state.isLoading }));
    toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
    toggleSearchable = () =>
        this.setState(state => ({ isSearchable: !state.isSearchable }));
    render() {
        const {
            isClearable,
            isSearchable,
            isDisabled,
            isLoading,
            isRtl,
        } = this.state;
        return (
            <Fragment>
                <Select
                    className="basic-single mt-20 select add-movie-div "
                    classNamePrefix="select"
                    defaultValue={'зал 1'}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    options={options}
                    styles={customStyles}
                />
            </Fragment>
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

export default connect(mapStateToProps)(SingleSelect);