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
//
// function proxy<T>(pageObject: T): Chainable<T> {
//   let proxyResult = pageObject
//   const chainable = new Proxy(pageObject, {
//     get(target, prop) {
//       // if (typeof target[prop] === 'function') {
//       //   return function (...args) {
//       //     return target[prop](...args)
//       //   };
//       // } else
//       if (isAsyncFunction(pageObject[prop]) && !isPromise(proxyResult)) {
//         return function (...args) {
//           // new Promise((resolve) => {
//           pageObject[prop](args)
//           // resolve()
//           .then(result => {
//             console.log(`Результат: ${result}!`)
//             if (result !== undefined) {
//               return result
//             } else {
//               return chainable
//             }
//
//           })
//           .catch(error => console.log(`Результат ошибки: ${error}!`))
//           // await originalMethod.run()
//         }
//       } else if (prop === 'then' || prop === 'catch') {
//         return function (...args) {
//           const then = pageObject[prop]
//
//           console.log(then)
//         }
//       }
//     }
//   })
//
//   return chainable
// }