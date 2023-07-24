import Page from "./Page.ts";

class AbTestPage extends Page {

  get parTextElement() {
    return $('.example p')
  }

  async open() {
    await super.open('abtest')
  }

  async checkParTextElementToHaveText(text: string = undefined) {
    if (typeof text !== undefined) {
      await expect(this.parTextElement).toHaveText(text)
    } else {
      throw Error('Set value !')
    }

    return this.parTextElement.getText()
  }
}

export default new AbTestPage()
