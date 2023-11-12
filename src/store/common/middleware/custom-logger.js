/**
 * Currying function
 * const curryFn = (a) => (b,c) => {
      return a + b - c
    };
    const withA = curryFn(3);
    withA(2,4);// 3 + 2 - 4
  *
  * Demystifying middleware
 */
const customLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState()); // previous state

  next(action); // updating reducer -> updating store -> which will rerun all selectors

  console.log("nextState: ", store.getState()); // new state
};

export default customLoggerMiddleware;

