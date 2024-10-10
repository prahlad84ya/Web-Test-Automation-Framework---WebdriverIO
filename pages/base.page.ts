import { browser } from '@wdio/globals'
import { URLS } from '../data/urls'
export default class BasePage {
    public async open (url: string) { 
        await browser.url(url);
    }

    public generatePageUrl(page:string) {
        return URLS.appUrl + URLS['pages'][page];
    }

    public async navigageTo(page:string) {
        var browserUrl = await browser.getUrl();
        var pageUrl = this.generatePageUrl(page);
        if(await browserUrl != pageUrl)
            await this.open(pageUrl);
    }

    public generateListOfRandomNumbers(numberOfItems:number, min:number, max:number) {
        var numList : number[] = [];
        while (numList.length < numberOfItems){
            var randomNumber = Math.floor(Math.random() * (max-min) + min);
            if (numList.indexOf(randomNumber) == -1)
                numList.push(randomNumber);
        }
        return numList;
    }
}
