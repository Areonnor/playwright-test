import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  Locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        Locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        Locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js Button',
        text: 'Node.js',
      },
      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },

      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHube icon',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord icon',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        Locator: (page: Page): Locator =>
          page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Lightmode icon',
      },
      {
        Locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
        name: 'Search input',
      },
      {
        Locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        Locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisability() {
    for (const { Locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(Locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { Locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(Locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttribute() {
    for (const { Locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect(Locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }
  async clickSwitchLightModeIcon() {
    await this.page.getByLabel('Switch between dark and light').click();
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDataThemeAttributeValue() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
    //попытка вторым действием обойти баг сайта
    // await this.page.evaluate(() => {
    //  document.querySelector('html')?.setAttribute('data-theme-choice', 'dark');
    //});
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`PageWithlightmode.png`);
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`PageWithdarkmode.png`);
  }
}
