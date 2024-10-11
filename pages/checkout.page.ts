import { $, $$, browser, expect } from '@wdio/globals'
import PrimaryHeaderPage from './header.page.js';

class CheckoutPage extends PrimaryHeaderPage {
    public get firstname () { return $('#first-name'); }
    public get lastname () { return $('#last-name'); }
    public get postcode () { return $('#postal-code'); }
    public get continueBtn () { return $('#continue'); }

    public get summaryContainer () { return $('#checkout_summary_container'); }
    public get cartItems () { return this.summaryContainer.$$('//*[@data-test="inventory-item"]'); }
    public get summaryInfo () { return $('.summary_info')}
    public get paymentInfoLbl () {return this.summaryInfo.$('//*[@data-test="payment-info-label"]')}
    public get paymentInfoVal () {return this.summaryInfo.$('//*[@data-test="payment-info-value"]')}
    public get shippingInfoLbl () { return this.summaryInfo.$('//*[@data-test="shipping-info-label"]')}
    public get shippingInfoVal () { return this.summaryInfo.$('//*[@data-test="shipping-info-value"]')}
    public get priceTotalLbl () { return this.summaryInfo.$('//*[@data-test="total-info-label"]')}
    public get priceLbl () { return this.summaryInfo.$('//*[@data-test="subtotal-label"]')}
    public get taxLbl () { return this.summaryInfo.$('//*[@data-test="tax-label"]')}
    public get totalLbl () { return this.summaryInfo.$('//*[@data-test="total-label"]')}
    public get finishBtn() { return $('#finish'); }

    public get completeContainer () { return $('#checkout_complete_container'); }
    public get successIcon () { return this.completeContainer.$('//img[@data-test="pony-express"]'); }
    public get successMsg () { return this.completeContainer.$('//*[@data-test="complete-header"]'); }
    public get deliveryInstructions () { return this.completeContainer.$('//*[@data-test="complete-text"]');}
    
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

    public async verifySelectedProudctsOnCheckout() {
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

export default new CheckoutPage();
