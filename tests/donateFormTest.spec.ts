import { PAGE_URL } from './constants/pagesUrls';
import { ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE, PERSONAL_INFORMATION_DONATE_BUTTON, PERSONAL_INFORMATION_EMAIL_PLACEHOLDER, PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER, PERSONAL_INFORMATION_SCREEN, CARD_CONTINUE_BUTTON, CREDIT_CARD_CVC_PLACEHOLDER, CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER, ACTIVE_SCREEN_CREDIT_CARD, CREDIT_CARD_NUMBER_PLACEHOLDER, ACTIVE_PAYMENt_METHOD, DONATE_BUTTON, MONTHLY_BUTTON_ID, CURRENCY_BUTTON_CSS, CURRENCY_SYMBOL, AMOUNT_FILED, AMOUNT_FILED_CSS, DONATE_MONTHLY_BUTTON, COVER_TRANSACTION_COSTS_CHECKBOX, CREDIT_CARD_OPTION, CURRENCY_BUTTON_ID} from './constants/elements';

import { test, expect } from '@playwright/test';

test('Test donate with broken card', async ({ page }) => {
  await test.step(`Open the page`, async () => {
    await page.goto(PAGE_URL);
  });

  await test.step(`Click donate button`, async () => {
    const donateButtonLocator = page
    .frameLocator('#XBGSFAMB')
    .getByTestId(DONATE_BUTTON);

    await donateButtonLocator.click();
  });

  await test.step(`Click monthly button `, async () => {
    const monthlyButton = await page.
    frameLocator('#__checkout2')
    .getByTestId(MONTHLY_BUTTON_ID)

    await monthlyButton.click()
    await expect(monthlyButton).toHaveAttribute("aria-current", "true");
  });

  await test.step(`Select Curency `, async () => {
    const curencyList = await page
    .frameLocator('#__checkout2')
    .getByTestId(CURRENCY_BUTTON_ID).first()
    
    curencyList?.selectOption("USD")

    const curSymbol = await page.
    frameLocator('#__checkout2')
    .getByTestId(CURRENCY_SYMBOL)

    await expect(curSymbol).toHaveText("$");
  });

  await test.step(`Fill amount `, async () => {
    const fieldAmount = await page
    .frameLocator('#__checkout2')
    .getByTestId(AMOUNT_FILED)

    await fieldAmount.click()
    await fieldAmount.fill("")
    await fieldAmount.fill("100")

    await expect(fieldAmount).toHaveAttribute("value", "100");
  });

  await test.step(`Click donate monthly `, async () => {
    const danateMonthly = await page
    .frameLocator('#__checkout2')
    .getByTestId(DONATE_MONTHLY_BUTTON)

    await danateMonthly.click()

    const activeScreenPaymentMehtod =  await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_PAYMENt_METHOD)

    await expect(activeScreenPaymentMehtod).toBeVisible
  });

  await test.step(`Uncheck checkbox with commision`, async () => {
    const checkBoxLocator =  await page
    .frameLocator('#__checkout2')
    .getByTestId(COVER_TRANSACTION_COSTS_CHECKBOX)
    
    await checkBoxLocator.uncheck()
    await expect (checkBoxLocator).toHaveAttribute("aria-checked", "false");
  });

  await test.step(`Click pay by card `, async () => {
    await page
    .frameLocator('#__checkout2')
    .getByTestId(CREDIT_CARD_OPTION).click()

    expect (await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()
  });
  
  await test.step(`Enter card number `, async () => {
    const cardInputField = await page
    .frameLocator('#__checkout2')
    .frameLocator("iframe[title='Secure card number input frame']")
    .getByPlaceholder(CREDIT_CARD_NUMBER_PLACEHOLDER)

    await cardInputField.click()
    await cardInputField.fill("4242 4242 4242 4242")
    await expect(cardInputField).toHaveAttribute("value", "4242 4242 4242 4242");  
  });
  
  await test.step(`Enter expire date `, async () => {
    const cardInputExpireDate = await page
    .frameLocator('#__checkout2')
    .frameLocator("iframe[title='Secure expiration date input frame']")
    .getByPlaceholder(CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER)

    await cardInputExpireDate.fill("04 / 24")
    await expect(cardInputExpireDate).toHaveAttribute("value", "04 / 24"); 
    
  });
  
  await test.step(`Enter CVC code `, async () => {
    const cardInputCVC = await page
      .frameLocator('#__checkout2')
      .frameLocator("iframe[title='Secure CVC input frame']")
      .getByPlaceholder(CREDIT_CARD_CVC_PLACEHOLDER) 
    await cardInputCVC.fill("000")
    await expect(cardInputCVC).toHaveAttribute("value", "000");  
  });
  
  await test.step(`Click continue button `, async () => {
    const continueCardButton = await page
    .frameLocator('#__checkout2')
    .getByTestId(CARD_CONTINUE_BUTTON)
  
    await continueCardButton.click()
  
    const personalInformationScreen = await page
    .frameLocator('#__checkout2')
    .getByTestId(PERSONAL_INFORMATION_SCREEN)
  
    await expect(personalInformationScreen).toBeVisible() 
  });
  

  await test.step(`Fill first name `, async () => {
    const firstNameInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER)
    await firstNameInputField.click()
    await firstNameInputField.fill("test1")
    await expect(firstNameInputField).toHaveAttribute("value", "test1");  
  });
  

  await test.step(`Fill last name `, async () => {
    const lastNameInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER)
    await lastNameInputField.click()
    await lastNameInputField.fill("test2")
    await expect(lastNameInputField).toHaveAttribute("value", "test2");  
  });
  

  await test.step(`Fill email `, async () => {
    const emailInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_EMAIL_PLACEHOLDER)

    await emailInputField.click()
    await emailInputField.fill("ivanIvanovTestTest@gmail.com")
    await expect(emailInputField).toHaveAttribute("value", "ivanIvanovTestTest@gmail.com");  
  });
  

  await test.step(`Submit donate `, async () => {
    const submitDonateButton = await page
    .frameLocator('#__checkout2')
    .getByTestId(PERSONAL_INFORMATION_DONATE_BUTTON)

    await submitDonateButton.click()
  });
  

  await test.step(`Check active screen credit card with error `, async () => {
    const creditCardError = await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE)

    await expect(creditCardError).toBeVisible()

    await expect (await page
      .frameLocator('#__checkout2')
      .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()
  });
});

test('Test donate with broken card (Duplicate)', async ({ page }) => {
  await test.step(`Open the page`, async () => {
    await page.goto(PAGE_URL);
  });

  await test.step(`Click donate button`, async () => {
    const donateButtonLocator = page
    .frameLocator('#XBGSFAMB')
    .getByTestId(DONATE_BUTTON);

    await donateButtonLocator.click();
  });

  await test.step(`Click monthly button `, async () => {
    const monthlyButton = await page.
    frameLocator('#__checkout2')
    .getByTestId(MONTHLY_BUTTON_ID)

    await monthlyButton.click()
    await expect(monthlyButton).toHaveAttribute("aria-current", "true");
  });

  await test.step(`Select Curency `, async () => {
    const curencyList = await page
    .frameLocator('#__checkout2')
    .getByTestId(CURRENCY_BUTTON_ID).first()
    
    curencyList?.selectOption("USD")

    const curSymbol = await page.
    frameLocator('#__checkout2')
    .getByTestId(CURRENCY_SYMBOL)

    await expect(curSymbol).toHaveText("$");
  });

  await test.step(`Fill amount `, async () => {
    const fieldAmount = await page
    .frameLocator('#__checkout2')
    .getByTestId(AMOUNT_FILED)

    await fieldAmount.click()
    await fieldAmount.fill("")
    await fieldAmount.fill("100")

    await expect(fieldAmount).toHaveAttribute("value", "100");
  });

  await test.step(`Click donate monthly `, async () => {
    const danateMonthly = await page
    .frameLocator('#__checkout2')
    .getByTestId(DONATE_MONTHLY_BUTTON)

    await danateMonthly.click()

    const activeScreenPaymentMehtod =  await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_PAYMENt_METHOD)

    await expect(activeScreenPaymentMehtod).toBeVisible
  });

  await test.step(`Uncheck checkbox with commision`, async () => {
    const checkBoxLocator =  await page
    .frameLocator('#__checkout2')
    .getByTestId(COVER_TRANSACTION_COSTS_CHECKBOX)
    
    await checkBoxLocator.uncheck()
    await expect (checkBoxLocator).toHaveAttribute("aria-checked", "false");
  });

  await test.step(`Click pay by card `, async () => {
    await page
    .frameLocator('#__checkout2')
    .getByTestId(CREDIT_CARD_OPTION).click()

    expect (await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()
  });
  
  await test.step(`Enter card number `, async () => {
    const cardInputField = await page
    .frameLocator('#__checkout2')
    .frameLocator("iframe[title='Secure card number input frame']")
    .getByPlaceholder(CREDIT_CARD_NUMBER_PLACEHOLDER)

    await cardInputField.click()
    await cardInputField.fill("4242 4242 4242 4242")
    await expect(cardInputField).toHaveAttribute("value", "4242 4242 4242 4242");  
  });
  
  await test.step(`Enter expire date `, async () => {
    const cardInputExpireDate = await page
    .frameLocator('#__checkout2')
    .frameLocator("iframe[title='Secure expiration date input frame']")
    .getByPlaceholder(CREDIT_CARD_EXPIRE_DATE_PLACEHOLDER)

    await cardInputExpireDate.fill("04 / 24")
    await expect(cardInputExpireDate).toHaveAttribute("value", "04 / 24"); 
    
  });
  
  await test.step(`Enter CVC code `, async () => {
    const cardInputCVC = await page
      .frameLocator('#__checkout2')
      .frameLocator("iframe[title='Secure CVC input frame']")
      .getByPlaceholder(CREDIT_CARD_CVC_PLACEHOLDER) 
    await cardInputCVC.fill("000")
    await expect(cardInputCVC).toHaveAttribute("value", "000");  
  });
  
  await test.step(`Click continue button `, async () => {
    const continueCardButton = await page
    .frameLocator('#__checkout2')
    .getByTestId(CARD_CONTINUE_BUTTON)
  
    await continueCardButton.click()
  
    const personalInformationScreen = await page
    .frameLocator('#__checkout2')
    .getByTestId(PERSONAL_INFORMATION_SCREEN)
  
    await expect(personalInformationScreen).toBeVisible() 
  });
  

  await test.step(`Fill first name `, async () => {
    const firstNameInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_FIRST_NAME_PLACEHOLDER)
    await firstNameInputField.click()
    await firstNameInputField.fill("test1")
    await expect(firstNameInputField).toHaveAttribute("value", "test1");  
  });
  

  await test.step(`Fill last name `, async () => {
    const lastNameInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_LAST_NAME_PLACEHOLDER)
    await lastNameInputField.click()
    await lastNameInputField.fill("test2")
    await expect(lastNameInputField).toHaveAttribute("value", "test2");  
  });
  

  await test.step(`Fill email `, async () => {
    const emailInputField = await page
    .frameLocator('#__checkout2')
    .getByPlaceholder(PERSONAL_INFORMATION_EMAIL_PLACEHOLDER)

    await emailInputField.click()
    await emailInputField.fill("ivanIvanovTestTest@gmail.com")
    await expect(emailInputField).toHaveAttribute("value", "ivanIvanovTestTest@gmail.com");  
  });
  

  await test.step(`Submit donate `, async () => {
    const submitDonateButton = await page
    .frameLocator('#__checkout2')
    .getByTestId(PERSONAL_INFORMATION_DONATE_BUTTON)

    await submitDonateButton.click()
  });
  

  await test.step(`Check active screen credit card with error `, async () => {
    const creditCardError = await page
    .frameLocator('#__checkout2')
    .getByTestId(ACTIVE_SCREEN_CREDIT_CARD_CARD_EROR_MESSAGE)

    await expect(creditCardError).toBeVisible()

    await expect (await page
      .frameLocator('#__checkout2')
      .getByTestId(ACTIVE_SCREEN_CREDIT_CARD)).toBeVisible()
  });
});