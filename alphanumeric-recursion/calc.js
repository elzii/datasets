/**
 * Modules
 */
require('linqjs');

var arr = [1, 2, 3, 4, 5];
var doubled = arr.select(function(t){ return t * 2 });  // [2, 4, 6, 8, 10]

console.log( doubled )