import { $ } from '@wdio/globals'
import BasePage from './base.page.js';

export default class HeaderPage extends BasePage {
    public get primaryHeader () { return $('//*[@data-test="primary-header"]'); }
    public get secondaryHeader () { return $('//*[@data-test="secondary-header"]'); }
    public get cartContainer () { return this.primaryHeader.$('#shopping_cart_container')}
    public get cartBadge () { return this.cartContainer.$('//*[@data-test="shopping-cart-badge"]')}
    public get title () { return this.secondaryHeader.$('//*[@data-test="title"]'); }

    public async numberOfCartItems() {
          return Number(await this.cartBadge.getText()); 
     }

    public async pageTitle (): Promise<string> {
          return await this.title.getText(); 
     }
}