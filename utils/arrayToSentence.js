module.exports = (arr) => {
	let len = arr.length
	if(len === 0){
		console.error('array is empty')
	}else{
    	return arr.reduce((a,b,c) => {
    	    return a + (c - 1 === length ? ', ' : ' and ') + b
    	})
    }
}