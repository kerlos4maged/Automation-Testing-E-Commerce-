class ContactUs {

    constructor(page) {

        this.page = page
        // Contact Us
        this.ContactUsLocator = this.page.getByRole('link', { name: 'Contact us' })
        this.NameLocator = this.page.getByRole('textbox', { name: 'Name' })
        this.EmailLocator = this.page.locator('//*[@id="contact-us-form"]/div[2]/input')
        this.SubjectLocator = this.page.getByRole('textbox', { name: 'Subject' })
        this.MessageLocator = this.page.getByRole('textbox', { name: 'Your Message Here' })
        this.ImageLocator = this.page.locator('[name="upload_file"]')
        this.SubmitLocator = this.page.getByRole('button', { name: 'Submit' })
    }

    async clickOnContactUsButton() {
        await this.ContactUsLocator.click()
    }

    async goToContactUsPage() {
        await this.page.goto('contact_us', { waitUntil: 'domcontentloaded' })
    }

    async writeData(Name, Email, Subject, Message, Image) {
        await this.NameLocator.fill(Name)

        await this.EmailLocator.fill(Email)

        await this.SubjectLocator.fill(Subject)

        await this.MessageLocator.fill(Message)

        await this.ImageLocator.setInputFiles(Image)
    }

    async clickSubmit() {
        await this.SubmitLocator.click()
    }
}

export { ContactUs }

