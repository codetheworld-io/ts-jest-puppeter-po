import { IProduct } from '../interfaces';
import BasePO from './base.po';

class InventoryPO extends BasePO {
  private readonly $productItem = '.inventory_item';
  private readonly $addCart = '.btn_inventory';
  private readonly $cartCount = '.shopping_cart_badge';
  private readonly $product = {
    $name: '.inventory_item_name',
    $price: '.inventory_item_price',
  };

  async go() {
    await this.navigate('/inventory.html');

    if (!(await this.isInventoryPage())) {
      await this.autoLogin();
      await this.navigate('/inventory.html');
    }
  }

  async isInventoryPage(): Promise<boolean> {
    const title = await this.getElementTextBySelector('.title');
    return title.toUpperCase() === 'PRODUCTS' && page.url().includes('/inventory.html');
  }

  async getProducts(): Promise<IProduct[]> {
    const result: IProduct[] = [];

    const $items = await page.$$(this.$productItem);

    for (const $item of $items) {
      const $name = (await $item.$(this.$product.$name))!;
      const $price = (await $item.$(this.$product.$price))!;

      const priceText = await this.getElementText($price);

      result.push({
        name: await this.getElementText($name),
        price: parseFloat(priceText.replace(/\n/g, '').replace('$', '')),
      });
    }

    return result;
  }

  async addItemToCart(productName: string): Promise<void> {
    const $items = await page.$$(this.$productItem);

    for (const $item of $items) {
      const name = await this.getElementText((await $item.$(this.$product.$name))!);

      if (name === productName) {
        await (await $item.$(this.$addCart))?.click();
      }
    }
  }

  async getCartCount(): Promise<number> {
    const $cart = await page.$(this.$cartCount);
    if (!$cart) {
      return 0;
    }

    const cartCountText: string = await this.getElementText($cart);
    return parseInt(cartCountText || '0');
  }
}

export default new InventoryPO();
