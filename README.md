<div align="center">

# 🛒 Automation Testing — E-Commerce

### End-to-end test automation for [automationexercise.com](https://automationexercise.com)
Built with **Playwright**, the **Page Object Model**, **Allure Reports** and **GitHub Actions CI**

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-Report-orange?style=for-the-badge)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Coverage](#-test-coverage)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Tests](#-running-the-tests)
- [Reports](#-reports)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Handling Ads and Flaky Tests](#-handling-ads-and-flaky-tests)
- [Best Practices Used](#-best-practices-used)
- [Author](#-author)

---

## 🎯 About the Project

This project is a complete **UI test automation framework** for the e-commerce practice website
[Automation Exercise](https://automationexercise.com). It automates the official
[test cases](https://automationexercise.com/test_cases) of the site, covering user registration,
login, products, cart, checkout, categories, brands, contact form, and scrolling behavior.

The framework is designed to be **clean, maintainable and CI-ready**: every page is modeled as a
class (POM), test data is separated from test logic, secrets live in environment variables,
and every push to `main` triggers the full pipeline on GitHub Actions.

---

## ✨ Features

- ✅ **Page Object Model (POM)** for readable, reusable and maintainable tests
- ✅ **Data-driven** approach with a dedicated `test-data` folder
- ✅ **Secure configuration** using `.env` locally and GitHub Secrets/Variables on CI
- ✅ **Cross-browser** support (Chromium, Firefox, WebKit) locally, Chromium on CI for speed
- ✅ **Ad blocking fixture** to remove Google ads that break the flow
- ✅ **Allure + Playwright HTML reports** uploaded as artifacts on every run
- ✅ **Screenshots, videos and traces** captured on failures for easy debugging
- ✅ **Automatic retries** on CI to handle network slowness
- ✅ **GitHub Actions** workflow running on push, pull request and manual dispatch

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation and test runner |
| JavaScript (Node.js) | Programming language |
| dotenv | Loading environment variables locally |
| Allure Playwright | Rich test reporting |
| GitHub Actions | Continuous Integration |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```
Automation-Testing-E-Commerce-
│
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI pipeline
│
├── e2e/                          # Test specs
│   ├── brand.spec.js
│   ├── cart.spec.js
│   ├── category.spec.js
│   ├── checkout.spec.js
│   ├── contactus.spec.js
│   ├── home.spec.js
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── scroll.spec.js
│   └── signup.spec.js
│
├── pages/                        # Page Objects (POM)
│   ├── brandPage.js
│   ├── cartPage.js
│   ├── categoryPage.js
│   ├── checkoutPage.js
│   ├── contactusPage.js
│   ├── homePage.js
│   ├── loginPage.js
│   ├── productPage.js
│   ├── scrollPage.js
│   ├── searchPage.js
│   └── signupPage.js
│
├── test-data/                    # Test data kept apart from test logic
│   ├── cardData.js
│   ├── contactusData.js
│   ├── signupData.js
│   ├── userData.js
│   └── images/
│       └── image.png             # File used in the Contact Us upload
│
├── playwright.config.js          # Playwright configuration
├── package.json
├── .gitignore
└── .env                          # Local secrets (NOT committed)
```

---

## 🧪 Test Coverage

| Module | Spec File | Scenarios |
|--------|-----------|-----------|
| 👤 Signup | `signup.spec.js` | Register a new user, register with an existing email |
| 🔐 Login | `login.spec.js` | Login with valid credentials, login with invalid credentials, logout |
| 🏠 Home | `home.spec.js` | Home page verification, subscription |
| 📦 Products | `products.spec.js` | View all products, product details, search, reviews |
| 🛍️ Cart | `cart.spec.js` | Add products, quantities, remove items, search and verify cart after login, recommended items |
| 💳 Checkout | `checkout.spec.js` | Place order (register while checkout / before checkout / login before checkout), verify address details, download invoice |
| 🗂️ Category | `category.spec.js` | View category products |
| 🏷️ Brand | `brand.spec.js` | View and cart brand products |
| 📨 Contact Us | `contactus.spec.js` | Fill the form, upload a file, submit and verify success |
| 🖱️ Scroll | `scroll.spec.js` | Scroll up with the arrow button, scroll up without it |

> Test case IDs (`TC01`, `TC05`, `TC14` …) follow the numbering of the
> [official Automation Exercise test cases](https://automationexercise.com/test_cases).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS version recommended)
- [Git](https://git-scm.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kerlos4maged/Automation-Testing-E-Commerce-.git

# 2. Move into the project
cd Automation-Testing-E-Commerce-

# 3. Install dependencies
npm ci

# 4. Install Playwright browsers
npx playwright install --with-deps
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
Base_URL=https://automationexercise.com

Email=your_registered_email
PASSWORD=your_password

Invalid_EMAIL=wrong@email.com
Invalid_PASSWORD=wrong_password

CARD_NAME=Test User
CARD_NUMBER=4111111111111111
CARD_CVC=123
CARD_EXPIRYMONTH=12
CARD_EXPIRYYEAR=2030
```

| Variable | Description |
|----------|-------------|
| `Base_URL` | Base URL of the website under test |
| `Email` / `PASSWORD` | Valid, already registered account |
| `Invalid_EMAIL` / `Invalid_PASSWORD` | Credentials used for negative login tests |
| `CARD_*` | Payment details used in the checkout flow |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.
> On CI these values are provided through **GitHub Secrets / Variables** instead.

---

## ▶️ Running the Tests

```bash
# Run all tests (all browsers)
npx playwright test

# Run a single spec file
npx playwright test e2e/login.spec.js

# Run a single browser
npx playwright test --project=chromium

# Run a test by its title
npx playwright test -g "TC01"

# Run with the browser visible
npx playwright test --headed

# Debug mode (Playwright Inspector)
npx playwright test --debug

# Interactive UI mode
npx playwright test --ui
```

### Simulate the CI environment locally (PowerShell)

```powershell
$env:CI = "true"; npx playwright test
Remove-Item Env:CI
```

---

## 📊 Reports

### Playwright HTML report

```bash
npx playwright show-report
```

### Allure report

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

On CI, both reports are uploaded as **artifacts** (kept for 30 days) and can be downloaded
from the **Actions** tab of the repository.

---

## ⚙️ CI/CD Pipeline

The workflow lives in `.github/workflows/playwright.yml` and runs on:

- 🔼 every **push** to `main`
- 🔀 every **pull request**
- 🖐️ **manual** trigger (`workflow_dispatch`)

```
Checkout ➜ Setup Node ➜ npm ci ➜ Install browsers ➜ Run tests ➜ Generate Allure ➜ Upload reports
```

Environment values are injected from repository **Variables** and **Secrets**:

```yaml
env:
  Base_URL: ${{ vars.Base_URL || secrets.Base_URL }}
  Email: ${{ vars.Email || secrets.Email }}
  PASSWORD: ${{ vars.PASSWORD || secrets.PASSWORD }}
```

### CI vs. Local behavior

| Setting | 💻 Local | ☁️ CI |
|---------|---------|-------|
| Browsers | Chromium, Firefox, WebKit | Chromium only |
| Workers | Default (parallel) | 1 |
| Retries | 0 | 2 |

GitHub sets `CI=true` automatically, and `playwright.config.js` uses it to switch
between the two modes.

---

## 🛡️ Handling Ads and Flaky Tests

The target website shows **Google ads** (including the full-screen `#google_vignette`) which can
cover elements, change the URL and break navigation. To keep the suite stable:

- 🚫 **Ad requests are blocked** through a shared fixture using `page.route()`
- ⏱️ **Longer timeouts** for navigation, actions and assertions on slow networks
- 🔁 **Retries on CI** so one network hiccup does not fail the pipeline
- 🎥 **Trace, screenshot and video** are kept for failed tests to simplify debugging

---

## 🏆 Best Practices Used

- **Page Object Model**: locators and actions live in `pages/`, assertions in `e2e/`
- **Separation of concerns**: test data in `test-data/`, config in `playwright.config.js`
- **No hard-coded secrets**: everything sensitive comes from environment variables
- **Independent tests**: each test sets up its own state
- **Meaningful test names**: every test is traceable to an official test case ID
- **Auto-waiting locators** instead of fixed sleeps
- **Branch workflow**: feature branches merged into `main` through pull requests

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Kerlos Maged**

[![GitHub](https://img.shields.io/badge/GitHub-kerlos4maged-181717?style=for-the-badge&logo=github)](https://github.com/kerlos4maged)

---

<div align="center">

⭐ If you like this project, give it a star!

</div>
