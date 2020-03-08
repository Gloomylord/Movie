import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import './styleFiles/Search.css';
import * as Actions from "../store/MoviesInfo/actions";

class Search extends PureComponent {
    refSearch = React.createRef();

    clickSearch = () => {
        if (!this.props.some) {
            this.refSearch.current.onblur = () => {
                if (this.refSearch.current.value === '' && this.props.some) {
                    this.props.dispatch(Actions.changeSome());
                }
            };
            this.props.dispatch(Actions.changeSome());
            this.refSearch.current.focus();
        }
    };

    render() {
        return (<div className='block'>
            <input ref={this.refSearch}
                   onClick={this.clickSearch}
                   className={'center input-top ' + (!this.props.some ? 'search-up' : 'search-down')}/>
            <div className='search center pointer' onClick={this.clickSearch}/>
        </div>)
    }
}


function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(Search);
