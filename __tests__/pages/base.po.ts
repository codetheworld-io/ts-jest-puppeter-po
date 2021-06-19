import { ElementHandle } from 'puppeteer';
export default abstract class BasePO {
  protected readonly BASE_URL = 'https://www.saucedemo.com';

  abstract go(): Promise<void>;

  async navigate(url: string) {
    await page.goto(`${this.BASE_URL}${url}`);
  }

  async getElementTextBySelector($selector: string): Promise<string> {
    const element = await page.$($selector);

    if (!element) {
      return '';
    }

    return page.evaluate((ele: HTMLElement) => ele.textContent || '', element);
  }

  async getElementText($element: ElementHandle<Element>): Promise<string> {
    return $element.evaluate((ele: HTMLElement) => ele.textContent || '');
  }

  async autoLogin(): Promise<void> {
    page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('#login-button');
  }
}
