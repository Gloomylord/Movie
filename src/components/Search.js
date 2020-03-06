import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/Search.css';
import * as topicsActions from "../store/MoviesInfo/actions";

class Search extends PureComponent {
    refSearch = React.createRef();
    clickSearch = () => {
        if (!this.props.some) {
            this.refSearch.current.onblur = () => {
                if (this.refSearch.current.value === '' && this.props.some) {
                    this.props.dispatch(topicsActions.changeSome());
                }
            };
            this.props.dispatch(topicsActions.changeSome());
            this.refSearch.current.focus();
        }
    };

    render() {
        return (<div className='block'>
            <input ref={this.refSearch}
                   className={'center input-top ' + (!this.props.some ? 'search-up' : 'search-down')}/>
            <div className='search center pointer' onClick={this.clickSearch}/>
        </div>)
    }
}


function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(Search);
