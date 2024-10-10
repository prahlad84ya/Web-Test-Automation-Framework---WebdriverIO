import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pages/login.page.js';
import { URLS } from '../data/urls.js';
import { USERS } from '../data/users.js';

Given(/^(.*) is logged in and navigated to Swag Labs - (.*) page$/, 
    async (user:string, page:string) => {
        var user = USERS[user];
        var username = user['username'];
        var password = user['password']
        await LoginPage.open(URLS.appUrl);
        await LoginPage.login(username, password);
        await LoginPage.navigageTo(page);     
});