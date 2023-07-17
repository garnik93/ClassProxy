import {isPromise} from "sat-utils";

type AsyncMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
}[keyof T];

type AsyncMethods<T> = Pick<T, AsyncMethodNames<T>>;

type Chainable<T> = {
  [K in keyof AsyncMethods<T>]: (...args: Parameters<T[K]>) => Chainable<T>;
} & {
  end: () => T;
};

export default function proxy<T>(pageObject: T): Chainable<T> {
  const chainable = new Proxy(pageObject, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return function (...args) {
          const result = target[prop](...args)
          if (isPromise(result)) {
            result.then((result: any) => {
              // Дополнительная обработка успешного выполнения
              console.log('Дополнительная обработка успешного выполнения:', result);
              if (result !== undefined) {
                return result;
              } else {
                return chainable
              }
            })
            .catch((error: any) => {
              // Дополнительная обработка ошибки
              console.error('Дополнительная обработка ошибки:', error);
              throw error;
            });
          }
          return chainable
        };
        // } else if (prop === 'then' || prop === 'catch') {
        //   return async function (onResolve, onReject) {
        //     const handlerCatch = prop === 'catch' ? onResolve : onReject
        //     proxyResult = await proxyResult.catch((error) => ({
        //       _this_is_internal_proxy_error: true,
        //       error
        //     }))
        //
        //     if (proxyResult && proxyResult._this_is_internal_proxy_error) {
        //       return handlerCatch(proxyResult)
        //     }
        //
        //     const rePromised = Promise.resolve(proxyResult)
        //     return rePromised[prop].call(rePromised, onResolve, onReject)
        //   }
      }
    }
  })

  return chainable
}