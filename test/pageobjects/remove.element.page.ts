import Page from "./page.ts";


const path: string = 'add_remove_elements/'

class AddRemoveElementsPage extends Page {
  get addElementButton() {
    return $('button=Add Element')
  }

  get deleteElementButton() {
    return $$('#elements button.added-manually')
  }

  async open(): Promise<any> {
    await super.open(path)
  }

  async addNewElement(): Promise<any> {
    await this.addNewElementForCount(1)
    // return 'All very good mother faker'
  }

  async addNewElementForCount(count: number): Promise<any> {
    for (let i = 0; i < count; i++) {
      await this.addElementButton.click()
    }
  }

  // async deleteElement(item: number = 0) {
  async deleteElement(item: number = 0): Promise<any> {
    const setCount = (item === 0) ? 0 : -1

    // await this.deleteElementButton[item - setCount].waitUntil(
    //     async () => {
    //       return (
    //           await this.deleteElementButton[item - setCount].isDisplayed() === true
    //       )
    //     },
    //     {
    //       timeout: 15000,
    //       timeoutMsg: `${this.deleteElementButton[item - setCount].selector} should be visible !`
    //     }
    // )
    await this.deleteElementButton[0].click()
    // await this.deleteElementButton[0].click()
  }

  async deleteElementForCount(count: number): Promise<any> {
    for (let i = 0; i < count; i++) {
      await this.deleteElement()
    }
  }
}

export default new AddRemoveElementsPage()