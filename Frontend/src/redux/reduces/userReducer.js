import {IS_SIGN_IN, IS_SIGN_OUT, SET_USER_ID, SET_USER_TYPE} from "../actions/actionsType";


const userReducer = (state = {
    userId:"Nan",
    userType:"0",
    userLoggedIn:false
} , action)=>{
    if(action.type === IS_SIGN_IN){
        return {...state , userLoggedIn: true};
    }else if(action.type === IS_SIGN_OUT){
        return {...state , userLoggedIn: false};
    }else if(action.type === SET_USER_TYPE){
        return {...state , userType: action.userType}
    }else if(action.type === SET_USER_ID){
        return {...state , userId: action.userId}
    }else
        return state;
}

export default userReducer;