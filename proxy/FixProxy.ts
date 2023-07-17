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
            const promise = Promise.resolve(result)
            promise.then((result: any) => {
              // Дополнительная обработка успешного выполнения
              console.log('Дополнительная обработка успешного выполнения:', result);
              if (result !== undefined) {
                return result;
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
      }
    }
  })

  return chainable
}