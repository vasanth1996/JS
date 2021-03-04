//Approach 1
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  
  if(!target) throw new Error("Invalid target");

  if(typeof target !== "object"){
      return Object(target);
  }

  for(let source of sources){
    if(!source) continue;

    // Gets all the enumerables
    let desc = Object.getOwnPropertyDescriptors(source);

    // Gets all the symbols
    let symb = Object.getOwnPropertySymbols(source);

    for(let key in desc){
      // Skip if the property is not enumerable
      if(!desc[key].enumerable) continue;

      // if the target already contains the key, checks it write access - writable
      if(target[key]){
        let temp = Object.getOwnPropertyDescriptors(target);
        if(!temp[key].writable) throw Error('Error');
      }

      /**
       * Another way of checking Error
       * if(!Reflect.set(target,key, desc[key].value ? desc[key].value : desc[key].get())){
       *  throw Error('Error');
       * }
       */

      //If the property value is getter, we need to execute the getter
      target[key] = desc[key].value ? desc[key].value : desc[key].get();
    }
  
    //Iterates the symbols and assign if it is enumerable
    for(let key in symb){
      let sym = symb[key];
      if(!desc[sym].enumerable) continue;
      target[sym] = desc[sym].value;
    }

  }

  return target;
}
