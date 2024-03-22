//import { DONATE_FORM_IFRAME, INITIAL_PAGE_IFRAME, ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE, PERSONAL_INFORMATION_DONATE_BUTTON, PERSONAL_INFORMATION_EMAIL_PLACEHOLDER, PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_SCREEN, CARD_CONTINUE_BUTTON, CREDIT_CARD_CVC_PLACEHOLDER, CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER, ACTIVE_SCREEN_CREDIT_CARD, CREDIT_CARD_NUMBER_PLACEHOLDER, ACTIVE_PAYMENt_METHOD, DONATE_BUTTON, MONTHLY_BUTTON_ID, CURRENCY_BUTTON_CSS, CURRENCY_SYMBOL, AMOUNT_FILED, AMOUNT_FILED_CSS, DONATE_MONTHLY_BUTTON, COVER_TRANSACTION_COSTS_CHECKBOX, CREDIT_CARD_OPTION, CURRENCY_BUTTON_ID} from './constants/elements';
import { test } from "@playwright/test";
import { DonateFormHelper } from "./helpers/donateFormHelper.page";

test("Test donate with broken card", async ({ page }) => {
  const donateFormHelper = new DonateFormHelper(page);

  await test.step(`Open the page`, async () => {
    await donateFormHelper.gotoDonatePage();
  });

  await test.step(`Click donate button`, async () => {
    await donateFormHelper.clickDonateButton();
  });

  await test.step(`Click monthly button `, async () => {
    await donateFormHelper.clickMonthlyButton();
  });

  await test.step(`Select Curency `, async () => {
    await donateFormHelper.selectCurency("USD", "$");
  });

  await test.step(`Fill amount `, async () => {
    await donateFormHelper.fillAmount("100");
  });

  await test.step(`Click donate monthly `, async () => {
    await donateFormHelper.clickDonateMonthly();
  });

  await test.step(`Uncheck checkbox with commision`, async () => {
    await donateFormHelper.uncheckCommisionCheckbox();
  });

  await test.step(`Click pay by card `, async () => {
    await donateFormHelper.clickPayByCreditCard();
  });

  await test.step(`Enter card number `, async () => {
    await donateFormHelper.fillCardNumber("4242 4242 4242 4242");
  });

  await test.step(`Enter expire date `, async () => {
    await donateFormHelper.fillCreditCardExpireDate("04 / 24");
  });

  await test.step(`Enter CVC code `, async () => {
    await donateFormHelper.fillCreditCardCVCCode("000");
  });

  await test.step(`Click continue button `, async () => {
    await donateFormHelper.clickContinueWithCreditCardVutton();
  });

  await test.step(`Fill first name `, async () => {
    await donateFormHelper.fillFirstName("test1");
  });

  await test.step(`Fill last name `, async () => {
    await donateFormHelper.fillLastName("test2");
  });

  await test.step(`Fill email `, async () => {
    await donateFormHelper.fillEmail("ivanIvanovTestTest@gmail.com");
  });

  await test.step(`Submit donate `, async () => {
    await donateFormHelper.submitDonate();
  });

  await test.step(`Check active screen credit card with error `, async () => {
    await donateFormHelper.checkCCErrorOnCreditCardScreen();
  });
});

test("Test donate with broken card (Duplicate)", async ({ page }) => {
  const donateFormHelper = new DonateFormHelper(page);

  await test.step(`Open the page`, async () => {
    await donateFormHelper.gotoDonatePage();
  });

  await test.step(`Click donate button`, async () => {
    await donateFormHelper.clickDonateButton();
  });

  await test.step(`Click monthly button `, async () => {
    await donateFormHelper.clickMonthlyButton();
  });

  await test.step(`Select Curency `, async () => {
    await donateFormHelper.selectCurency("USD", "$");
  });

  await test.step(`Fill amount `, async () => {
    await donateFormHelper.fillAmount("100");
  });

  await test.step(`Click donate monthly `, async () => {
    await donateFormHelper.clickDonateMonthly();
  });

  await test.step(`Uncheck checkbox with commision`, async () => {
    await donateFormHelper.uncheckCommisionCheckbox();
  });

  await test.step(`Click pay by card `, async () => {
    await donateFormHelper.clickPayByCreditCard();
  });

  await test.step(`Enter card number `, async () => {
    await donateFormHelper.fillCardNumber("4242 4242 4242 4242");
  });

  await test.step(`Enter expire date `, async () => {
    await donateFormHelper.fillCreditCardExpireDate("04 / 24");
  });

  await test.step(`Enter CVC code `, async () => {
    await donateFormHelper.fillCreditCardCVCCode("000");
  });

  await test.step(`Click continue button `, async () => {
    await donateFormHelper.clickContinueWithCreditCardVutton();
  });

  await test.step(`Fill first name `, async () => {
    await donateFormHelper.fillFirstName("test1");
  });

  await test.step(`Fill last name `, async () => {
    await donateFormHelper.fillLastName("test2");
  });

  await test.step(`Fill email `, async () => {
    await donateFormHelper.fillEmail("ivanIvanovTestTest@gmail.com");
  });

  await test.step(`Submit donate `, async () => {
    await donateFormHelper.submitDonate();
  });

  await test.step(`Check active screen credit card with error `, async () => {
    await donateFormHelper.checkCCErrorOnCreditCardScreen();
  });
});
