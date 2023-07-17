import {$} from "@wdio/globals"
import Page from "./Page.ts";

class AbTestPage extends Page {

  get parTextElement() {
    return $('.example p')
  }

  async open() {
    await super.open('abtest')
  }

  async checkParTextElementToHaveText(text: string): Promise<any> {
    await expect(this.parTextElement).toHaveText(text)
  }
}

export default new AbTestPage()
