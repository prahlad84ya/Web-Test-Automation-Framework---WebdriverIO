import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, browser } from '@wdio/globals';
import productsPage from '../pages/products.page.js';
import { CONSTANTS } from '../constants/constants.ts';
import { CONTENT } from '../content/content.ts';

Given(/^selected (.*) products$/, 
    async (numberOfItems:string) => {
        await expect(await productsPage.title).toHaveText(CONTENT.productsPage.title);
        var numberOfTotalProducts = await (await productsPage.productsList).length;
        var randomProductsList = productsPage.generateListOfRandomNumbers(Number(numberOfItems), CONSTANTS.zero, await numberOfTotalProducts - 1);
        var listOfSelectedProducts :object[] = [];
        var totalPrice = 0;
        for(let item = 0; item < randomProductsList.length; item++){
            var productDetails = {};
            productDetails['id'] = randomProductsList[item];
            productDetails['name'] = await (await productsPage.getItemLbl(randomProductsList[item])).getText();
            productDetails['price'] = await (await productsPage.getItemPrice(randomProductsList[item])).getText();
            totalPrice += Number((await productDetails['price']).replace('$',''));
            listOfSelectedProducts.push(productDetails);
            var addToCartBtn = await productsPage.addToCartBtn(randomProductsList[item]);
            await addToCartBtn.click();
        }
        await expect(await productsPage.cartBadge).toHaveText(numberOfItems);
        await browser.sharedStore.set('selectedProducts'+process.env.WDIO_WORKER_ID, listOfSelectedProducts);
        await browser.sharedStore.set('totalPrice'+process.env.WDIO_WORKER_ID, totalPrice);
    });