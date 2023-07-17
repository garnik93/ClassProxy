import {isAsyncFunction, isPromise} from "sat-utils";
import RemoveElementPage from "../pageobjects/remove.element.page.ts";
import proxy from "../../proxy/FixProxy.ts";

type AsyncMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
}[keyof T];

type AsyncMethods<T> = Pick<T, AsyncMethodNames<T>>;

type Chainable<T> = {
  [K in keyof AsyncMethods<T>]: (...args: Parameters<T[K]>) => Chainable<T>;
} & {
  end: () => T;
};

// function proxy<T>(pageObject: T): Chainable<T> {
//   const chainable = new Proxy(pageObject, {
//     get(target, prop) {
//       if (typeof target[prop] === 'function') {
//         return async function (...args) {
//           const result = await target[prop](...args);
//           if (isPromise(result)) {
//             result.then((value) => {
//               console.log(`Результат: ${value}!`);
//               return chainable;
//             }).catch((error) => {
//               console.log(`Результат ошибки: ${error}!`);
//               return chainable;
//             });
//             return chainable;
//           } else {
//             console.log(`Результат: ${result}!`);
//             return chainable;
//           }
//         };
//       }
//       return target[prop];
//     }
//   });
//
//   return chainable;
// }

describe('My Login application', () => {

  // const proxy = proxyPageObject(AbTestPage)

  const text: string = 'Also known as split testing. ' +
      'This is a way in which businesses are able to ' +
      'simultaneously test and learn different versions ' +
      'of a page to see which text and/or functionality ' +
      'works best towards a desired outcome ' +
      '(e.g. a user action such as a click-through).'

  it('should login with valid credentials', async () => {

    const page = proxy(RemoveElementPage)

    await page
    .open()
    .addNewElement()
    .deleteElement()
    .addNewElementForCount(10)
    .deleteElementForCount(5)

    // await AbTestPage.open()
    // await AbTestPage.checkParTextElementToHaveText(text)

    // await proxy
    // .open()
    // .checkParTextElementToHaveText(text)
  })
})

