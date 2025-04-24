 // SimpleJS 信号系统
export function signal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    
    function get() {
      return value;
    }
    
    function set(newValue) {
      if (value === newValue) return;
      value = newValue;
      notify();
    }
    
    function update(fn) {
      set(fn(value));
    }
    
    function notify() {
      subscribers.forEach(subscriber => subscriber(value));
    }
    
    function subscribe(subscriber) {
      subscribers.add(subscriber);
      subscriber(value);
      
      return function unsubscribe() {
        subscribers.delete(subscriber);
      };
    }
    
    return {
      get value() { return get(); },
      set value(newValue) { set(newValue); },
      set,
      update,
      subscribe
    };
  }
  
  export function compute(fn) {
    const result = signal(fn());
    
    return {
      get value() { return result.value; },
      subscribe: result.subscribe
    };
  }
  
  export function watch(signal, fn) {
    return signal.subscribe(fn);
  }
  
  export function flow(source) {
    return {
      filter(predicate) {
        const result = signal(
          Array.isArray(source.value) 
            ? source.value.filter(predicate)
            : []
        );
        
        source.subscribe(value => {
          result.set(Array.isArray(value) ? value.filter(predicate) : []);
        });
        
        return flow(result);
      },
      
      map(mapper) {
        const result = signal(
          Array.isArray(source.value)
            ? source.value.map(mapper)
            : []
        );
        
        source.subscribe(value => {
          result.set(Array.isArray(value) ? value.map(mapper) : []);
        });
        
        return flow(result);
      },
      
      sort(compareFn) {
        const result = signal(
          Array.isArray(source.value)
            ? [...source.value].sort(compareFn)
            : []
        );
        
        source.subscribe(value => {
          result.set(Array.isArray(value) ? [...value].sort(compareFn) : []);
        });
        
        return flow(result);
      },
      
      subscribe: source.subscribe
    };
  }