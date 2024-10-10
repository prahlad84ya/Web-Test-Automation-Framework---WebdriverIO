import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, browser } from '@wdio/globals';
import { CONTENT } from '../data/content.js';
import { USERS } from '../data/users.js';
import productsPage from '../pages/products.page.js';
import cartPage from '../pages/cart.page.js';
import checkoutPage from '../pages/checkout.page.js';

Given(/^reviewed selected products in the cart$/, 
    async () => {
        var selectedProducts = await browser.sharedStore.get('selectedProducts');
        await productsPage.cartContainer.click();
        await expect(await cartPage.title).toHaveText(CONTENT.cartPage.title);
        await expect(await productsPage.cartBadge).toHaveText(String(await selectedProducts.length));
        await cartPage.verifySelectedProudctsInCart();
});

When(/^(.*) clicks on the checkout button and continues with the checkout information$/,
    async (user:string)=>{
        var user = USERS[user];
        var firstname = user['firstname'];
        var lastname = user['lastname'];
        var postalcode = user['zipcode'];
        var selectedProducts = await browser.sharedStore.get('selectedProducts');
        await cartPage.checkoutBtn.click();
        await expect(await checkoutPage.title).toHaveText(CONTENT.checkoutPage.title.yourInformation);
        await expect(await productsPage.cartBadge).toHaveText(String(await selectedProducts.length));
        await checkoutPage.firstname.setValue(firstname);
        await checkoutPage.lastname.setValue(lastname);
        await checkoutPage.postcode.setValue(postalcode);
        await checkoutPage.continueBtn.click();
        await expect(await checkoutPage.title).toHaveText(CONTENT.checkoutPage.title.overview);
        await expect(await productsPage.cartBadge).toHaveText(String(await selectedProducts.length));
});

Then(/^(.*) should see checkout overview$/, 
    async(user:string)=>{
        var user = USERS[user];
        var selectedProducts = await browser.sharedStore.get('selectedProducts');
        var totalPrice = await browser.sharedStore.get('totalPrice');
        var itemPriceLbl = CONTENT.checkoutPage.itemTotalLbl+String(totalPrice);
        await expect(await productsPage.cartBadge).toHaveText(String(await selectedProducts.length));
        await checkoutPage.verifySelectedProudctsOnCheckout();
        await expect(await checkoutPage.paymentInfoLbl).toHaveText(CONTENT.checkoutPage.paymentInfoLbl);
        await expect(await checkoutPage.paymentInfoVal).toBeDisplayed();
        await expect(await checkoutPage.shippingInfoLbl).toHaveText(CONTENT.checkoutPage.shippingInfoLbl);
        await expect(await checkoutPage.shippingInfoVal).toBeDisplayed();
        await expect(await checkoutPage.priceTotalLbl).toHaveText(CONTENT.checkoutPage.priceTotalLbl);
        await expect(await checkoutPage.priceLbl).toHaveText(itemPriceLbl);
        await expect(await checkoutPage.taxLbl).toHaveText(expect.stringContaining(CONTENT.checkoutPage.taxLbl));
        await expect(await checkoutPage.totalLbl).toHaveText(expect.stringContaining(CONTENT.checkoutPage.totalLbl));
});

Then(/^presented with sucessful checkout message after clicking on the finish button$/,
    async()=>{
        await checkoutPage.finishBtn.click();
        await expect(await checkoutPage.title).toHaveText(CONTENT.checkoutPage.title.complete);
        await expect(await productsPage.cartBadge).not.toBeDisplayed();
        await expect(await checkoutPage.successMsg).toHaveText(CONTENT.checkoutPage.successMessage);
        await expect(await checkoutPage.deliveryInstructions).toHaveText(CONTENT.checkoutPage.instructions);
    });