import { $, $$ } from '@wdio/globals'
import PrimaryHeaderPage from './header.page.js';

class ProductsPage extends PrimaryHeaderPage {
    public get productsContainer () { return $('//*[@data-test="inventory-container"]'); }
    public get productsList () { return this.productsContainer.$$('//*[@data-test="inventory-item"]'); }
    
    public async getItem(id:number) : Promise<WebdriverIO.Element>{
        var productLink = await (await this.productsContainer).$(`//*[@data-test="item-${id}-title-link"]`)
        return await (await productLink.parentElement()).parentElement();
    }

    public async getItemLbl(id:number){
        var item = await this.getItem(id);
        return await (await item).$('//*[@data-test="inventory-item-name"]');
    }

    public async getItemPrice(id:number){
        var item = await this.getItem(id);
        return await (await item).$('//*[@data-test="inventory-item-price"]');
    }
    
    public async addToCartBtn(id:number){
        var item = await this.getItem(id);
        return await (await item).$('button');
    }
}
export default new ProductsPage();