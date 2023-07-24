import Agent from "../../utils/Agent.ts";
// import {isAsyncFunction, isFunction, isPromise} from "sat-utils";
// import proxyPageObject from "../../proxy/Proxy.ts";
// import proxy from "../../proxy/FixProxy.ts";

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

  const text: string = 'Also known as split testing. ' +
      'This is a way in which businesses are able to ' +
      'simultaneously test and learn different versions ' +
      'of a page to see which text and/or functionality ' +
      'works best towards a desired outcome ' +
      '(e.g. a user action such as a click-through).'

  it('should login with valid credentials', async () => {

    // Agent.onAbTestPage()


    await Agent.onAbTestPage().open().checkParTextElementToHaveText(text)

    await Agent.onAddRemoveElementsPage().open()

    await Agent.onAddRemoveElementsPage()
    .addNewElement()
    .deleteElement(0)
    .addNewElementForCount(10)
    .deleteElementForCount(5)
  })
})

