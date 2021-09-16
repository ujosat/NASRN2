import UserController from "../controllers/UserController";
import Config from 'react-native-config';
export const actionTypes ={
    
    SEARCH_ERROR:'SEARCH_ERROR',
    SEARCH_SUCCESS:'SEARCH_SUCCESS',
    SEARCH_CLEAR:'SEARCH_CLEAR',
    SEARCH_ERROR_CLEAR:'SEARCH_ERROR_CLEAR',
    PLAN_FILTER:'PLAN_FILTER',
    OPERATOR_FILTER:'OPERATOR_FILTER'
    
}


const searchError = error => ({
    type: actionTypes.SEARCH_ERROR,
    payload: error ,
  });
  
const searchSuccess = data => ({
    type: actionTypes.SEARCH_SUCCESS,
    payload: { data}
  });
  const searchClear = () => ({
    type: actionTypes.SEARCH_CLEAR,
  });
  const searchErrorClear = () => ({
    type: actionTypes.SEARCH_ERROR_CLEAR,
  });

  export const searchPlanFilter = data => ({
    type: actionTypes.PLAN_FILTER,
    payload:data
  });
  export const searchOperatorFilter = data => ({
    type: actionTypes.OPERATOR_FILTER,
    payload:data
  });



export const searchAction = (searchValue) =>async dispatch => {
     
    
    try {
        var obj={
            "search":searchValue
        }
    
      const data = await UserController.searchCall("/simcardlist",obj)
      //console.log(JSON.stringify(data))
      dispatch(searchSuccess(data));
      dispatch(searchPlanFilter("prepaid"));
      dispatch(searchOperatorFilter(data?.operators[0]?.id));
      
      dispatch(searchErrorClear());
      
    } catch (error) {
        
        dispatch(searchClear());
      dispatch(searchError("no operators found"));
      
    }
  };
