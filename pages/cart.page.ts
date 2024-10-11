import { $, $$, browser, expect } from '@wdio/globals'
import PrimaryHeaderPage from './header.page.js';

class CartPage extends PrimaryHeaderPage {
    public get cartContainer () { return $('//*[@data-test="cart-contents-container"]'); }
    public get cartItems () { return this.cartContainer.$$('//*[@data-test="inventory-item"]')}
    public get checkoutBtn () { return $('#checkout'); }

    public async getCartItem(id:number){
        var cartItem = $(`//*[@data-test="item-${id}-title-link"]`);
        return await (await (await cartItem).parentElement()).parentElement();
    }

    public async getCartItemName(id){
        return (await this.getCartItem(id)).$('//*[@data-test="inventory-item-name"]');
    }

    public async getCartItemPrice(id){
        return (await this.getCartItem(id)).$('//*[@data-test="inventory-item-price"]');
    }

    public async verifySelectedProudctsInCart() {
        var cartItems = await this.cartItems;
        var selectedItems = await browser.sharedStore.get('selectedProducts'+process.env.WDIO_WORKER_ID);
        await expect(cartItems.length).toBe(selectedItems.length);
        for(let item = 0; item < await selectedItems.length; item++){
            var id = selectedItems[item].id;
            var cartItem = await this.getCartItem(id);
            var cartItemName = await (await this.getCartItemName(id)).getText();
            var cartItemPrice = await (await this.getCartItemPrice(id)).getText();
            await expect(await cartItem).toBeExisting();
            await expect(await cartItemName).toBe(await selectedItems[item].name);
            await expect(await cartItemPrice).toBe(await selectedItems[item].price);
        }
    }
}

export default new CartPage();