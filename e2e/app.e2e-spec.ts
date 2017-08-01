import { SuitesPage } from './app.po';

describe('suites App', () => {
  let page: SuitesPage;

  beforeEach(() => {
    page = new SuitesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
