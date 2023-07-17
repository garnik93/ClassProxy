/**
 * test with page objects
 */
import AbTestPage from '../pageobjects/AbTestPage.ts'
import proxyPageObject from "../pageobjects/Proxy.ts";

describe('My Login application', () => {

    const proxy = proxyPageObject(AbTestPage)

    const text: string = 'Also known as split testing. ' +
        'This is a way in which businesses are able to ' +
        'simultaneously test and learn different versions ' +
        'of a page to see which text and/or functionality ' +
        'works best towards a desired outcome ' +
        '(e.g. a user action such as a click-through).'

    it('should login with valid credentials', async () => {
        await proxy
        .open()
        .checkParTextElementToHaveText(text)
    })
})

