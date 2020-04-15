let COUNTER_STATE = {
    angka : 10,
    name : ''
}


//  REDUCER FUNCTION YANG NGE RETURN OBJECT

export const counterReducer = (state = COUNTER_STATE , action) => {
    // if(action.type === 'INCREMENT'){
    //     return {...state, angka : state.angka + 1}
    // }else if(action.type === 'DECREMENT'){
    //     return {...state, angka : state.angka - 1}
    // }else if(action.type === 'ACTIONWITHPAYLOAD' ){
    //     return {...state, name : action.payload}
    // }else{
    //     return state
    // }

    switch(action.type){
        case 'INCREMENT':
            return {...state, angka : state.angka + 1}
        case 'DECREMENT':
            return {...state, angka : state.angka - 1}
        case 'ACTIONWITHPAYLOAD':
            return {...state, name : action.payload}
        default:
            return state
    }

}