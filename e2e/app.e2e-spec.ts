import { SindarinPage } from './app.po';

describe('sindarin App', function() {
  let page: SindarinPage;

  beforeEach(() => {
    page = new SindarinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
