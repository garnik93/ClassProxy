import {browser} from "@wdio/globals";

export default class Page {
  private url = `https://the-internet.herokuapp.com/`

  public async open(path: string) {
    return browser.url(`${this.url}${path}`)
  }
}