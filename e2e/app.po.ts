import { browser, element, by } from 'protractor';

export class TsmeanFePage {
  navigateTo() {
    return browser.get('/');
  }

  getTeaserText() {
    return element(by.css('app-jumbotron h1')).getText();
  }
}
