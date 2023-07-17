import {$} from "@wdio/globals"
import Page from "./Page.ts";

class AbTestPage extends Page {

    get parTextElement() {
        return $('.example p')
    }

    async open () {
        await super.open('abtest')
        return this
    }

    async checkParTextElementToHaveText(text: string): Promise<any> {
        await expect(this.parTextElement).toHaveText(text)
        return this
    }
}

export default new AbTestPage()
