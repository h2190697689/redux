//Array.reduce(function(total,currentValue,currentIndex,arr), initialValue)
// total 必须，初始值或者是计算后的返回值
// currentValue  必须，当前值
// currentIndex 可选，当前值的索引
// arr 可选，当前数组

// initialValue  可选传递给函数的初始值

var arr=[1,2,3,1,4,3];
var sum = arr.reduce((prev,cur)=>{
    return prev+cur;
},6)
console.log(sum);

// 数组去重
var newArr = arr.reduce(function(prev,cur){
	prev.indexOf(cur)===-1 && prev.push(cur);
	return prev;
},[])
console.log(newArr);