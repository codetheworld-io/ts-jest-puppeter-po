import cartPo from './pages/cart.po';
import inventoryPo from './pages/inventory.po';

describe('Cart', () => {
  beforeEach(async () => {
    await inventoryPo.go();
  });

  it('should add correct products to cart', async () => {
    const products = await inventoryPo.getProducts();

    const randomItems = products.sort(() => 0.5 - Math.random()).slice(0, 3);

    for (const item of randomItems) {
      await inventoryPo.addItemToCart(item.name);
    }

    expect(await inventoryPo.getCartCount()).toEqual(randomItems.length);

    await cartPo.go();

    const cartItems = await cartPo.getCartItems();

    expect(cartItems.sort()).toEqual(randomItems.sort());
  });
});
