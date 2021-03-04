//Approach 1 - Vasanth

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


//Approach 2 - Maya
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) throw new Error();
  target = Object(target);
  sources.forEach(src => {
    src = Object(src);

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(src));
    let symbols = Object.getOwnPropertySymbols(src);
    symbols.forEach(symbol => target[symbol] = src[symbol])
  });
  return target;
}

//Approach 3 - JSer
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) throw new Error('invalid target')

  let result = target
  if (['number', 'string', 'boolean'].includes(typeof target)) {
    result = Object(target)
  }

  for (const source of sources) {
    if (source === null || source === undefined) continue
    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
      .filter(item => Object.getOwnPropertyDescriptor(source, item).enumerable)
    ]
    for (const key of keys) {
      if (!Reflect.set(result, key, source[key])) {
        throw new Error('cannot assign to read-only properties')
      }
    }
  }
  return result
}
