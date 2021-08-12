const round = (num) => {
	return parseFloat((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2))
}

export default round
