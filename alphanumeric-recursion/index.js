/**
 * Modules
 */
require('linqjs');

// debug toggle
var debug = true;

/**
 * Factorial Recursion 
 */
var f = [];
factorial = function(n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
}

/**
 * Combinations
 */
function combinations(str) {
  var fn = function(active, rest, a) {
    if (!active && !rest)
      return;
    if (!rest) {
      a.push(active);
    } else {
      fn(active + rest[0], rest.slice(1), a);
      fn(active, rest.slice(1), a);
    }
    return a;
  }
  return fn("", str, []);
}


/**
 * Possible Cases
 */
function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] + allCasesOfRest[i]);
      }
    }
    return result;
  }
}

/**
 * Permutations
 */
function perms(data) {
    if (!(data instanceof Array)) {
        throw new TypeError("input data must be an Array");
    }

    data = data.slice();  // make a copy
    var permutations = [],
        stack = [];

    function doPerm() {
        if (data.length == 0) {
            permutations.push(stack.slice());
        }
        for (var i = 0; i < data.length; i++) {
            var x = data.splice(i, 1);
            stack.push(x);
            doPerm();
            stack.pop();
            data.splice(i, 0, x);
        }
    }

    doPerm();
    return permutations;
}

var input = "abcd".split('');
var result = perms(input);
for (var i = 0; i < result.length; i++) {
    result[i] = result[i].join('');
}
console.log(result);


var AN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// array of possible alpha characters
var alpha_arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// array of possible numeric characters
var numeric_arr = ['0','1','2','3','4','5','6','7','8','9'];

// arrays combined
var an_arr = alpha_arr.concat(numeric_arr)
  // DEBUG
  if ( debug ) console.log( 'AN', an_arr )

// numbers of allowable characters = 26+10 = 36
var max = 36;
    
// length of combination (number of characters)
var length = 2;

// get max number of combinations
var combos = Math.pow(max, length)
  // DEBUG
  if ( debug ) console.log( 'combos', combos )
    
var distinct = ( combos/factorial(length) )
  // DEBUG
  if ( debug ) console.log( 'distinct', distinct )
  


// for ( var i=0; i<distinct; i++ ) {}
