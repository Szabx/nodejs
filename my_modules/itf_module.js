// Transform text to uppercase

/**
 * [toUpperCase description]
 * @param  {[type]}   str
 * @param  {Function} fn 
 * @return {[type]}      
 */
function toUpperCase(str, fn) {
	if (!fn)
	{
		console.error('Callback function not implemented!');
		return;
	}
	try	{
		str = str.toUpperCase();
		fn(false, str);
	} catch(errorObject) {
		fn(errorObject, str);
	}
}

// Public elements
module.exports = {
	uCase: toUpperCase
};