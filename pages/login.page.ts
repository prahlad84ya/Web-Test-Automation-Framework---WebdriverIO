import { $ } from '@wdio/globals'
import BasePage from './base.page.js';

class LoginPage extends BasePage {
    public get username () { return $('#user-name'); }
    public get password () { return $('#password'); }
    public get loginBtn () { return $('#login-button'); }
    
    public async login (username: string, password: string) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginBtn.click();
    }
}

export default new LoginPage();
