import { TsmeanFePage } from './app.po';

describe('tsmean-fe App', () => {
  let page: TsmeanFePage;

  beforeEach(() => {
    page = new TsmeanFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
