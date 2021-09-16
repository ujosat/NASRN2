import {actionTypes} from '../actions/searchAction';

const errorReducer =(state={},{payload, type})=>{
    switch(type)
    {
        case actionTypes.SEARCH_ERROR:
            return {...state , error: payload}; 
        case actionTypes.SEARCH_ERROR_CLEAR:
            return {}
        default:
            return state;

    }
}

export default errorReducer;