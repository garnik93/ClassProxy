import {isAsyncFunction, isFunction, isPromise} from "sat-utils";

type AsyncMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
}[keyof T];

type AsyncMethods<T> = Pick<T, AsyncMethodNames<T>>;

type Chainable<T> = {
  [K in keyof AsyncMethods<T>]: (...args: Parameters<T[K]>) => Chainable<T>;
} & {
  end: () => T;
};

// export default function proxy<T>(pageObject: T): Chainable<T> {
//   let proxyResult = pageObject
//   const chainable = new Proxy(pageObject, {
//     get(target, propName) {
//       // if (typeof target[propName] === 'function') {
//       //   return function (...args) {
//       //     const result = new Promise(async (resolve, reject) => {
//       //       resolve(await target[propName](args))
//       //     })
//       //   }
//       // } else
//       if (!isFunction(pageObject[propName]) && !isAsyncFunction(pageObject[propName]) && !isPromise(proxyResult) && pageObject[propName]) {
//         return proxyResult.then(() => pageObject[propName])
//       } else if (isFunction(pageObject[propName]) || isAsyncFunction(pageObject[propName]) && isPromise(pageObject[propName])) {
//         return function (...args) {
//           async function handler() {
//             await proxyResult;
//             return pageObject[propName](...args)
//           }
//
//           proxyResult = await handler()
//           return chainable;
//         }
//       } else if (isAsyncFunction(pageObject[propName]) && !isPromise(proxyResult)) {
//         return async function (...args) {
//           const originalMethod = pageObject[propName];
//
//           await originalMethod.apply(propName, ...args)
//           return chainable
//         }
//       } else if (isFunction(pageObject[propName]) && !isPromise(proxyResult)) {
//         return function (...args) {
//           proxyResult = pageObject[propName](...args)
//           return chainable
//         }
//       } else if ((propName === 'then' || propName === 'catch') && isPromise(proxyResult)) {
//         return async function (onResolve, onReject) {
//           const handlerCatch = propName === 'catch' ? onResolve : onReject
//           proxyResult = await proxyResult.catch((error) => ({
//             _this_is_internal_proxy_error: true,
//             error
//           }))
//
//           if (proxyResult && proxyResult._this_is_internal_proxy_error) {
//             return handlerCatch(proxyResult)
//           }
//
//           const rePromised = Promise.resolve(proxyResult)
//           return rePromised[propName].call(rePromised, onResolve, onReject)
//         }
//       }
//     }
//   })
//   return chainable
// }

// if (isAsyncFunction(target[propName]) && isPromise(result)) {
//   const promise = Promise.resolve(result)
//   promise.then((result: any) => {
//     // Дополнительная обработка успешного выполнения
//     console.log('Дополнительная обработка успешного выполнения:', result);
//     if (result !== undefined) {
//       return result;
//     } else {
//       // return chainable
//     }
//   })
//   .catch((error: any) => {
//     // Дополнительная обработка ошибки
//     console.error('Дополнительная обработка ошибки:', error);
//     throw error;
//   });
// } else {
//   // return chainable
// }
// return chainable


// get(target, propName, receiver) {
//   if (typeof target[propName] === 'function') {
//     return function (...args) {
//       const result = target[propName](args)
//
//       if (isAsyncFunction(target[propName]) && isPromise(result)) {
//         const promise = Promise.resolve(result)
//         promise.then((result: any) => {
//           // Дополнительная обработка успешного выполнения
//           console.log('Дополнительная обработка успешного выполнения:', result);
//           if (result !== undefined) {
//             return result;
//           } else {
//             return chainable
//           }
//         })
//         .catch((error: any) => {
//           // Дополнительная обработка ошибки
//           console.error('Дополнительная обработка ошибки:', error);
//           throw error;
//         });
//       } else if (result !== undefined) {
//         return result
//       } else {
//         return proxyResult
//       }
//     }
//   }
// }}
