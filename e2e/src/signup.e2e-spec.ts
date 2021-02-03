import { browser, logging } from 'protractor';
import { SignupPage } from './signup.po';

describe('Signup', () => {
  let page: SignupPage;

  beforeEach(() => {
    page = new SignupPage();
  });

  it('valid form was submitted', async () => {
    await page.navigateTo();
    await page.setFirstnameValue('test');
    await page.setLastnameValue('test');
    await page.setEmailValue('test@test.com');
    await page.setPasswordValue('Password');
    await page.setPasswordConfirmationValue('Password');
    await page.submitForm();
    expect(await page.snackBarShown()).toEqual(true);
  });

  it('submit button is disabled when form is invalid', async () => {
    await page.navigateTo();
    expect(await page.submitButtonDisabled()).toEqual('true');
  });

  it('toggle password visability', async () => {
    await page.navigateTo();
    await page.togglePasswordVisibility();
    expect(await page.getPasswordFieldType()).toEqual('text');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
