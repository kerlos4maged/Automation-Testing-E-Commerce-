
import { expect, test } from "@playwright/test";
import { ContactUs } from "../pages/contactusPage";
import { ContactUsData } from "../test-data/contactusData";

test.describe("ContactUs function", () => {
   
    test("TC06: Contact Us Form", async ({ page }) => {
        const contactUsPage = new ContactUs(page);
        const Data = ContactUsData;

        await page.goto('/');
        await contactUsPage.clickOnContactUsButton();
        
        await contactUsPage.goToContactUsPage();

        await contactUsPage.writeData(
            Data.name,
            Data.email,
            Data.subject,
            Data.message,
            Data.image
        );
        
        // to handle dialog message return in alert
        const dialogPromise = page.waitForEvent('dialog').then(async dialog => {
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.accept();
        });

        await contactUsPage.clickSubmit();
        await dialogPromise;

        await expect(
            page.locator('div.status.alert.alert-success')
        ).toBeVisible();

        await page.locator('a.btn.btn-success').click();

        await expect(page).toHaveURL('/');
    });
});
