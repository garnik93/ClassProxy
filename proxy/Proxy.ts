import {isAsyncFunction, isFunction, isPromise} from "sat-utils";

// type AsyncMethodNames<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
// }[keyof T];
//
// type AsyncMethods<T> = Pick<T, AsyncMethodNames<T>>;
//
// type Chainable<T> = {
//   [K in keyof AsyncMethods<T>]: (...args: Parameters<T[K]>) => Chainable<T>;
// } & {
//   end: () => T;
// };

export default function proxyPageObject(pageObject) {
  let proxedResult = pageObject
  const proxed = new Proxy(pageObject, {
    get(_target, propName) {
      // console.log(proxedResult, pageObject[propName])
      if (propName === 'toJSON') {
        return function () {
          return proxedResult
        }
      }

      if (!isFunction(pageObject[propName]) && !isAsyncFunction(pageObject[propName]) && isPromise(proxedResult) && pageObject[propName]) {
        return proxedResult.then(() => pageObject[propName])
      } else if (isFunction(pageObject[propName]) || isAsyncFunction(pageObject[propName]) && isPromise(pageObject[propName])) {
        return function (...args) {
          async function handler() {
            await proxedResult;
            return pageObject[propName](...args)
          }

          proxedResult = handler()
          return proxed;
        }
      }
      else if (isAsyncFunction(pageObject[propName]) && !isPromise(proxedResult)) {
        return function (...args) {
          proxedResult = pageObject[propName](...args)
          console.log(proxedResult, pageObject[propName])
          return proxed
        }
      }
      else if (isFunction(pageObject[propName]) && !isPromise(proxedResult)) {
        return function (...args) {
          proxedResult = pageObject[propName](...args)
          console.log(proxedResult, pageObject[propName])
          return proxed
        }
      }
      else if ((propName === 'then' || propName === 'catch') && isPromise(proxedResult)) {
        return async function (onResolve, onReject) {
          const handlerCatch = propName === 'catch' ? onResolve : onReject
          proxedResult = await proxedResult.catch((error) => ({
            _this_is_internal_proxy_error: true,
            error
          }))

          if (proxedResult && proxedResult._this_is_internal_proxy_error) {
            return handlerCatch(proxedResult.error)
          }

          const rePromised = Promise.resolve(proxedResult)
          console.log(proxedResult, pageObject[propName])
          return rePromised[propName].call(rePromised, onResolve, onReject)
        }
      }

      console.log(proxedResult[propName], _target[propName])
      return proxedResult[propName]
    }
  })

  // proxed.end = () => pageObject;

  return proxed;
}