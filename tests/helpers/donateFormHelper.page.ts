import { DONATE_PAGE_URL } from "../constants/pagesUrls";
import {
  CC_NUMBER_IFRAME,
  CC_CVC_IFRAME,
  CC_EXPIRE_DATE_IFRAME,
  DONATE_FORM_IFRAME,
  INITIAL_PAGE_IFRAME,
  ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE,
  PERSONAL_INFORMATION_DONATE_BUTTON,
  PERSONAL_INFORMATION_EMAIL_PLACEHOLDER,
  PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER,
  PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER,
  PERSONAL_INFORMATION_SCREEN,
  CARD_CONTINUE_BUTTON,
  CREDIT_CARD_CVC_PLACEHOLDER,
  CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER,
  ACTIVE_SCREEN_CREDIT_CARD,
  CREDIT_CARD_NUMBER_PLACEHOLDER,
  ACTIVE_PAYMENt_METHOD,
  DONATE_BUTTON,
  MONTHLY_BUTTON_ID,
  CURRENCY_SYMBOL,
  AMOUNT_FILED,
  DONATE_MONTHLY_BUTTON,
  COVER_TRANSACTION_COSTS_CHECKBOX,
  CREDIT_CARD_OPTION,
  CURRENCY_BUTTON_ID,
} from "../constants/elements";
import { Page, expect } from "@playwright/test";

export class DonateFormHelper {
  constructor(private page: Page) {}

  public donateButtonLocator = this.page
    .frameLocator(INITIAL_PAGE_IFRAME)
    .getByTestId(DONATE_BUTTON);

  public monthlyButton = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(MONTHLY_BUTTON_ID);

  public curencyList = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(CURRENCY_BUTTON_ID)
    .first();

  public curSymbol = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(CURRENCY_SYMBOL);

  public checkBoxLocator = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(COVER_TRANSACTION_COSTS_CHECKBOX);

  public danateMonthly = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(DONATE_MONTHLY_BUTTON);

  public activeScreenPaymentMehtod = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(ACTIVE_PAYMENt_METHOD);

  public fieldAmount = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(AMOUNT_FILED);

  public cardInputExpireDate = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .frameLocator(CC_EXPIRE_DATE_IFRAME)
    .getByPlaceholder(CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER);

  public cardInputCVC = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .frameLocator(CC_CVC_IFRAME)
    .getByPlaceholder(CREDIT_CARD_CVC_PLACEHOLDER);

  public continueCardButton = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(CARD_CONTINUE_BUTTON);

  public personalInformationScreen = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(PERSONAL_INFORMATION_SCREEN);

  public firstNameInputField = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByPlaceholder(PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER);

  public lastNameInputField = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByPlaceholder(PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER);

  public emailInputField = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByPlaceholder(PERSONAL_INFORMATION_EMAIL_PLACEHOLDER);

  public submitDonateButton = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(PERSONAL_INFORMATION_DONATE_BUTTON);

  public creditCardError = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE);

  public creditCardOption = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(CREDIT_CARD_OPTION);

  public activeScreedCreditCard = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD);

  public cardInputField = this.page
    .frameLocator(DONATE_FORM_IFRAME)
    .frameLocator(CC_NUMBER_IFRAME)
    .getByPlaceholder(CREDIT_CARD_NUMBER_PLACEHOLDER);

  async gotoDonatePage() {
    await this.page.goto(DONATE_PAGE_URL);
  }

  async clickDonateButton() {
    await this.donateButtonLocator.click();
  }

  async clickMonthlyButton() {
    await this.monthlyButton.click();
    await expect(this.monthlyButton).toHaveAttribute("aria-current", "true");
  }

  async selectCurency(curency: string, curencySymbol: string) {
    await this.curencyList?.selectOption(curency);
    await expect(this.curSymbol).toHaveText(curencySymbol);
  }

  async fillAmount(amount: string) {
    await this.fieldAmount.click();
    await this.fieldAmount.fill("");
    await this.fieldAmount.fill(amount);

    await expect(this.fieldAmount).toHaveAttribute("value", amount);
  }

  async clickDonateMonthly() {
    await this.danateMonthly.click();
    await expect(this.activeScreenPaymentMehtod).toBeVisible;
  }

  async uncheckCommisionCheckbox() {
    await this.checkBoxLocator.uncheck();
    await expect(this.checkBoxLocator).toHaveAttribute("aria-checked", "false");
  }

  async clickPayByCreditCard() {
    await this.creditCardOption.click();
    await expect(this.activeScreedCreditCard).toBeVisible();
  }

  async fillCardNumber(creditCardNumber: string) {
    await this.cardInputField.click();
    await this.cardInputField.fill(creditCardNumber);
    await expect(this.cardInputField).toHaveAttribute(
      "value",
      creditCardNumber,
    );
  }

  async fillCreditCardExpireDate(date: string) {
    await this.cardInputExpireDate.fill(date);
    await expect(this.cardInputExpireDate).toHaveAttribute("value", date);
  }

  async fillCreditCardCVCCode(code: string) {
    await this.cardInputCVC.fill(code);
    await expect(this.cardInputCVC).toHaveAttribute("value", code);
  }

  async clickContinueWithCreditCardVutton() {
    await this.continueCardButton.click();
    await expect(this.personalInformationScreen).toBeVisible();
  }

  async fillFirstName(name: string) {
    await this.firstNameInputField.click();
    await this.firstNameInputField.fill(name);
    await expect(this.firstNameInputField).toHaveAttribute("value", name);
  }
  async fillLastName(lastName: string) {
    await this.lastNameInputField.click();
    await this.lastNameInputField.fill(lastName);
    await expect(this.lastNameInputField).toHaveAttribute("value", lastName);
  }

  async fillEmail(email: string) {
    await this.emailInputField.click();
    await this.emailInputField.fill(email);
    await expect(this.emailInputField).toHaveAttribute("value", email);
  }

  async submitDonate() {
    await this.submitDonateButton.click();
  }

  async checkCCErrorOnCreditCardScreen() {
    await expect(this.creditCardError).toBeVisible();
    await expect(this.activeScreedCreditCard).toBeVisible();
  }
}
