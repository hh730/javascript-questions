function appendClasses(existingClasses,newClass){
  if(!newClass) return existingClasses;
  return existingClasses ? (existingClasses + ' ' + newClass) : newClass;
}

function processArg(arg){
  // return the class as it is 
  if(typeof arg === 'string'){
    return arg;
  }
   
  // convert the class to a string
  if(typeof arg === 'number'){
    return ""+arg;
  }
  
  // return empty string if no value
  if(typeof arg !== 'object'){
    return '';
  }
  
  // if arg is array, spread all of its value as arguments to the main function and 
  // recursively call it for processing
  if(Array.isArray(arg)){
    return classNames(...arg);
  }
  // if the arg is object, check if the key is its own property (avoid checking in prototype chain)
  // and if its value is truthy create a string of classes and return it
  let classes='';
  for(let key in arg){
    if(arg.hasOwnProperty(key)&&arg[key]){
        const newClass=processArg(key);
        classes=appendClasses(classes,newClass);
    }
  }
  return classes;
}

function classNames(...args){
    let classes='';
    for(let arg of args){
        if(arg){
            let newClass=processArg(arg);
            classes=appendClasses(classes,newClass);
        }
    }
    return classes;
}



// Input and Output
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

const arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'

let buttonType = 'primary';
classNames({ [`btn-${buttonType}`]: true });

