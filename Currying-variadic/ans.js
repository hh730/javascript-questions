function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// function curry(fn) {
//   let counter=0;
//   const argsLength=fn.length;
//   let params=[];
//   console.log(argsLength)
//   const curried=function (...args) {
//       params=[...params,...args]
//       counter=counter+[...args].length
//         if(counter<argsLength){
//       return function(...args2){
//           params=[...params,...args2]
//           counter=counter+[...args2].length;
//           if(counter<argsLength){
//               return curried;
//           }else{
//               const value= fn(...params);
//               counter=0;
//               params=[];
//               return value;
//           }
//       }
//   }else{
//       const value= fn(...params);
//               counter=0;
//               params=[];
//               return value;
//   }
//   };
//   return curried
// }
