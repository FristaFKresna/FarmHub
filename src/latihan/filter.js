var arr = [5,4,2,3,4]

var new_arr = arr.filter((el) => {
    return el > 2
})
console.log(new_arr)



// ===================

for(var i = 0; i < arr.length; i++){
    console.log(arr[i])
}

arr.forEach((el)=>{
    console.log(el)
})

// =====================

var new_arr = arr.map((el)=>{
    return el*2
})

console.log(new_arr)