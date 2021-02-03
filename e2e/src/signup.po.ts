import { browser, by, element, ElementFinder } from 'protractor';

export class SignupPage {
  firstNameElement = element(by.css('[data-e2e-id=firstname] input'));
  lastNameElement = element(by.css('[data-e2e-id=lastname] input'));
  emailElement = element(by.css('[data-e2e-id=email] input'));
  passwordElement = element(by.css('[data-e2e-id=password] input'));
  passwordConfirmationElement = element(by.css('[data-e2e-id=passwordConfirmation] input'));
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }
  async setFirstnameValue(value: string): Promise<void> {
    return this.firstNameElement.sendKeys(value);
  }

  async setLastnameValue(value: string): Promise<void> {
    return this.lastNameElement.sendKeys(value);
  }

  async setEmailValue(value: string): Promise<void> {
    return this.emailElement.sendKeys(value);
  }

  async setPasswordValue(value: string): Promise<void> {
    return this.passwordElement.sendKeys(value);
  }

  async setPasswordConfirmationValue(value: string): Promise<void> {
    return this.passwordConfirmationElement.sendKeys(value);
  }

  async togglePasswordVisibility(): Promise<void> {
    return element(by.css('mat-form-field [data-e2e-id=togglePassword]')).click();
  }

  async submitButtonDisabled(): Promise<string> {
    return element(by.css('button[type=submit]')).getAttribute('disabled');
  }
  async submitForm(): Promise<void> {
    return element(by.css('button[type=submit]')).click();
  }
  async snackBarShown(): Promise<boolean> {
    return element(by.css('snack-bar-container')).isPresent();
  }
  async getPasswordFieldType(): Promise<string> {
    return this.passwordElement.getAttribute('type');
  }
}
