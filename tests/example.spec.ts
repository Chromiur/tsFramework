import { PAGE_URL } from './constants/pagesUrls';
import { ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE, PERSONAL_INFORMATION_DONATE_BUTTON, PERSONAL_INFORMATION_EMAIL_PLACEHOLDER, PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_SCREEN, CARD_CONTINUE_BUTTON, CREDIT_CARD_CVC_PLACEHOLDER, CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER, ACTIVE_SCREEN_CREDIT_CARD, CREDIT_CARD_NUMBER_PLACEHOLDER, ACTIVE_PAYMENt_METHOD, DONATE_BUTTON, MONTHLY_BUTTON_ID, CURRENCY_BUTTON_CSS, CURRENCY_SYMBOL, AMOUNT_FILED, AMOUNT_FILED_CSS, DONATE_MONTHLY_BUTTON, COVER_TRANSACTION_COSTS_CHECKBOX, CREDIT_CARD_OPTION, CURRENCY_BUTTON_ID} from './constants/elements';

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(PAGE_URL);

  const donateButtonLocator = page
    .frameLocator('#XBGSFAMB')
    .getByText('Give Now');

  await donateButtonLocator.click();

  //next layer
  const monthlyButton = await page.
  frameLocator('#__checkout2')
  .getByTestId(MONTHLY_BUTTON_ID)

  await monthlyButton.click()
  await expect(monthlyButton).toHaveAttribute("aria-current", "true");

  //select curency
  const curencyList = await page
  .frameLocator('#__checkout2')
  .getByTestId(CURRENCY_BUTTON_ID).first()
  
  curencyList?.selectOption("USD")

  const curSymbol = await page.
  frameLocator('#__checkout2')
  .getByTestId(CURRENCY_SYMBOL)

  await expect(curSymbol).toHaveText("$");

  //fill amount
  const fieldAmount = await page
  .frameLocator('#__checkout2')
  .getByTestId(AMOUNT_FILED)


  await fieldAmount.click()
  await fieldAmount.fill("")
  await fieldAmount.fill("100")

  await expect(fieldAmount).toHaveAttribute("value", "100");
  

  //Try to pay
  const danateMonthly = await page
  .frameLocator('#__checkout2')
  .getByTestId(DONATE_MONTHLY_BUTTON)

  await danateMonthly.click()

  await page
  .frameLocator('#__checkout2')
  .getByTestId(ACTIVE_PAYMENt_METHOD).isVisible



  //uncheck checkbox
  const checkBoxLocator =  await page
  .frameLocator('#__checkout2')
  .getByTestId(COVER_TRANSACTION_COSTS_CHECKBOX)
  
  
  await checkBoxLocator.uncheck()
  await expect (checkBoxLocator).toHaveAttribute("aria-checked", "false");


  //click pay by card
  await page
  .frameLocator('#__checkout2')
  .getByTestId(CREDIT_CARD_OPTION).click()

  expect (await page
  .frameLocator('#__checkout2')
  .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()


  //enter card number
  const cardInputField = await page
  .frameLocator('#__checkout2')
  .frameLocator("iframe[title='Secure card number input frame']")
  .getByPlaceholder(CREDIT_CARD_NUMBER_PLACEHOLDER)

  await cardInputField.click()
  await cardInputField.fill("4242 4242 4242 4242")
  await expect(cardInputField).toHaveAttribute("value", "4242 4242 4242 4242");  

  //enter expire date
  const cardInputExpireDate = await page
  .frameLocator('#__checkout2')
  .frameLocator("iframe[title='Secure expiration date input frame']")
  .getByPlaceholder(CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER)

  await cardInputExpireDate.fill("04 / 24")
  await expect(cardInputExpireDate).toHaveAttribute("value", "04 / 24");  


  //enter CVC code
  const cardInputCVC = await page
  .frameLocator('#__checkout2')
  .frameLocator("iframe[title='Secure CVC input frame']")
  .getByPlaceholder(CREDIT_CARD_CVC_PLACEHOLDER)

  await cardInputCVC.fill("000")
  await expect(cardInputCVC).toHaveAttribute("value", "000");  

  //Push continue button

  const continueCardButton = await page
  .frameLocator('#__checkout2')
  .getByTestId(CARD_CONTINUE_BUTTON)

  await continueCardButton.click()

  const personalInformationScreen = await page
  .frameLocator('#__checkout2')
  .getByTestId(PERSONAL_INFORMATION_SCREEN)

  await expect(personalInformationScreen).toBeVisible()

  //fill first name
  const firstNameInputField = await page
  .frameLocator('#__checkout2')
  .getByPlaceholder(PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER)
  await firstNameInputField.click()
  await firstNameInputField.fill("test1")
  await expect(firstNameInputField).toHaveAttribute("value", "test1");  

  //fill last name
  const lastNameInputField = await page
  .frameLocator('#__checkout2')
  .getByPlaceholder(PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER)
  await lastNameInputField.click()
  await lastNameInputField.fill("test2")
  await expect(lastNameInputField).toHaveAttribute("value", "test2");  


  //fill email
  const emailInputField = await page
  .frameLocator('#__checkout2')
  .getByPlaceholder(PERSONAL_INFORMATION_EMAIL_PLACEHOLDER)
  await emailInputField.click()
  await emailInputField.fill("ivanIvanovTestTest@gmail.com")
  await expect(emailInputField).toHaveAttribute("value", "ivanIvanovTestTest@gmail.com");  

  //submit donate
  const submitDonateButton = await page
  .frameLocator('#__checkout2')
  .getByTestId(PERSONAL_INFORMATION_DONATE_BUTTON)

  await submitDonateButton.click()

  //check active screen credit card with error

  const creditCardError = await page
  .frameLocator('#__checkout2')
  .getByTestId(ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE)

  await expect(creditCardError).toBeVisible()


  await expect (await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()
});