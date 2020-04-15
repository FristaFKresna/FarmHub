let LISTTODO_STATE = {
    list : 'Makan',
    list2: 'Belajar',
    list3: ''
}


export let listToDoReducer = (state = LISTTODO_STATE, action) => {

    switch(action.type){
        case 'ACTIONWITHPAYLOAD':
            return {...state, list3:action.payload }
        default :
            return state
            
    }

    
}