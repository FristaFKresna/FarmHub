export let actionWithPayloadParameter = (data) => {
    return{
        type : 'BEBAS',
        payload : data
    }
}

export let actionWithPayload = () => {
    return{
        type : 'ACTIONWITHPAYLOAD',
        payload : 'mandi'
    }
}