import { TsmeanFePage } from './app.po';

describe('tsmean-fe App', () => {
  let page: TsmeanFePage;

  beforeEach(() => {
    page = new TsmeanFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getTeaserText()).toEqual('This is going to be a cool web-app!');
  });
});
