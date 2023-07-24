import { makePropertiesChainable } from 'chain-simple'

type AsyncMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
}[keyof T];

type AsyncMethods<T> = Pick<T, AsyncMethodNames<T>>;

type Chainable<T> = {
  [K in keyof AsyncMethods<T>]: (...args: Parameters<T[K]>) => Chainable<T>;
}

export default function chaining<T>(pageObject: T): Chainable<T> {
  return makePropertiesChainable(pageObject)
}