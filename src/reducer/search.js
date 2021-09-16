
import {actionTypes} from '../actions/searchAction';

const searchReducer =(state={},{payload, type})=>{
    switch(type)
    {
        case actionTypes.SEARCH_SUCCESS:
            
            return {...state , ...payload.data };
        case actionTypes.PLAN_FILTER:
            
                return {...state , activeFilter:payload};
        case actionTypes.OPERATOR_FILTER:
            
                return {...state , operator:payload };
        case actionTypes.SEARCH_CLEAR:
            return {}
        default:
            return state;

    }
}

export default searchReducer;