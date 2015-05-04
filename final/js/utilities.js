var U = {
	$: function(id) { // takes the id value for the element to be retrieved and is a property of the U object
// to assign a value to the object's property, use the propertyName:value syntax
		'use strict';		
		if (typeof id == 'string') {
			return document.getElementById(id); // returns reference to the id element
		}
	}, // end of $() function
	
	setText: function(id, message) { // takes two arguments: the id value of the element to be updated and the message
		'use strict';
		if ((typeof id == 'string') && (typeof message == 'srting')) { // both validated as strings
			var output = this.$(id); // element is fetched using the internal $() function
			if (!output) return false;
			if (output.textContent !== undefined) {
				output.textContent = message;
			} else {
				output.innerText = message;
			}
			return true;
		} // end of main if
	}, // end of setText() function
	
	addEvent: function(obj, type, fn) {
		'use strict';
		if (obj && obj.addEventListener) {
			obj.addEventListener(type, fn, false);
		} else if (obj && obj.attachEvent) {
			obj.attachEvent('on' + type, fn);
		} // end of if
	}, // end of addEvent() function
	
	removeEvent: function(obj, type, fn) {
		'use strict';
		if (obj && obj.removeEventListener) {
			obj.removeEventListener(type, fn, false);
		} else if (obj && obj.detachEvent) {
			obj.detachEvent('on' + type, fn);
		} // end of if
	} // end of removeEvent() funtion
}; // end of U declaration
