import chaining from "./Proxyes.ts";
import RemoveElementPage from "../test/pageobjects/remove.element.page.ts"
import AbTestPage from "../test/pageobjects/AbTestPage.ts";

class Agent {
  private readonly browser: any

  onAbTestPage() {
    return chaining(AbTestPage)
  }

  onAddRemoveElementsPage() {
    return chaining(RemoveElementPage)
  }

  get getBrowser () {
    return this.browser
  }
}

export default new Agent()