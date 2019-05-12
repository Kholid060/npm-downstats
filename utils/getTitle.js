let arrayToSentence = (arr) => {
	let len = arr.length
	if(len === 0){
		console.error('array is empty')
	}else{
    	let last = arr.pop()
    	return arr.join(', ') + ' and ' + last
    }
}

let capitalize = (val) => {
	return val.charAt(0).toUpperCase() + val.slice(1)
}

module.exports = (a) => {
	return a.length === 1 ? `${capitalize(a[0])} Download Statistics - PackStats` : `Compare ${capitalize(arrayToSentence(a))} Download Statistics - PackStats`
}