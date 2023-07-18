import Page from "./page.ts";

const path: string = 'add_remove_elements/'

class AddRemoveElementsPage extends Page {
  get addElementButton() {
    return $('button=Add Element')
  }

  get deleteElementButton() {
    return $$('#elements button.added-manually')
  }

  async open() {
    await super.open(path)
  }

  async addNewElement() {
    await this.addNewElementForCount(1)
  }

  async addNewElementForCount(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addElementButton.click()
    }
  }

  async deleteElement(item: number = 0) {
    const setCount = item === 0 ? 0 : -1

    await this.deleteElementButton[item - setCount].waitUntil(
        async () => {
          return (
              await this.deleteElementButton[item - setCount].isDisplayed() === true
          )
        },
        {
          timeout: 15000,
          timeoutMsg: `${this.deleteElementButton[item - setCount].selector} should be visible !`
        }
    )
    await this.deleteElementButton[item - setCount].click()
  }

  async deleteElementForCount(count: number) {
      for (let i = 0; i < count; i++) {
        await this.deleteElement(0)
      }
  }
}

export default new AddRemoveElementsPage()