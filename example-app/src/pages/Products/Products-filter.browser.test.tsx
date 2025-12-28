import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { createMemoryRouter } from "react-router";
import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { IProduct } from "@/features/products/types/IProduct";
import { host } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { Component as ProductsPage } from "@/pages/Products";
import { productsPageLoader } from "@/pages/Products/loader";
import { BrowserTestProviders } from "@/test-lib/browser-providers";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

const user = UserFixture.toStructure();
const worker = setupWorker();

function mockProductsAPI(products: IProduct[]) {
  worker.use(
    http.get(`${host}/products`, () =>
      HttpResponse.json(products, {
        headers: { "x-total-count": String(products.length) },
      })
    )
  );
}

function createProductsRouter() {
  return createMemoryRouter(
    [{ path: "/products", element: <ProductsPage />, loader: productsPageLoader }],
    { initialEntries: ["/products"] }
  );
}

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => worker.stop());

beforeEach(() => {
  localStorage.setItem("fake_store_is_authenticated", "true");
  worker.use(http.get(`${host}/users/:userId`, () => HttpResponse.json(user)));
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  queryClient.clear();
  worker.resetHandlers();
});

test("When filtering by product name, then only matching products are displayed", async () => {
  // Arrange
  const matchingProduct = ProductFixture.createPermutation({ id: 1, title: "Nike Running Shoes" });
  const nonMatchingProduct = ProductFixture.createPermutation({ id: 2, title: "Cotton T-Shirt" });
  mockProductsAPI([matchingProduct, nonMatchingProduct]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);

  // Act
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("textbox", { name: "Product name" }).fill("shoes");

  // Assert
  await expect.element(screen.getByText(matchingProduct.title)).toBeVisible();
  await expect.element(screen.getByText(nonMatchingProduct.title)).not.toBeInTheDocument();
});

test("When filtering by minimum price, then only products meeting price criteria are shown", async () => {
  // Arrange
  const cheapProduct = ProductFixture.createPermutation({ id: 1, title: "Budget Item", price: 50 });
  const expensiveProduct = ProductFixture.createPermutation({ id: 2, title: "Premium Item", price: 150 });
  mockProductsAPI([cheapProduct, expensiveProduct]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);

  // Act
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("spinbutton", { name: "Min price" }).fill("100");

  // Assert
  await expect.element(screen.getByText(expensiveProduct.title)).toBeVisible();
  await expect.element(screen.getByText(cheapProduct.title)).not.toBeInTheDocument();
});

test("When filtering by price range, then only products within range are shown", async () => {
  // Arrange
  const cheapProduct = ProductFixture.createPermutation({ id: 1, title: "Cheap Item", price: 30 });
  const midRangeProduct = ProductFixture.createPermutation({ id: 2, title: "Mid Item", price: 75 });
  const expensiveProduct = ProductFixture.createPermutation({ id: 3, title: "Expensive Item", price: 200 });
  mockProductsAPI([cheapProduct, midRangeProduct, expensiveProduct]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);

  // Act
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("spinbutton", { name: "Min price" }).fill("50");
  await screen.getByRole("spinbutton", { name: "Max price" }).fill("150");

  // Assert
  await expect.element(screen.getByText(midRangeProduct.title)).toBeVisible();
  await expect.element(screen.getByText(cheapProduct.title)).not.toBeInTheDocument();
  await expect.element(screen.getByText(expensiveProduct.title)).not.toBeInTheDocument();
});

test("When combining name and price filters, then products must match all criteria", async () => {
  // Arrange
  const matchingProduct = ProductFixture.createPermutation({ id: 1, title: "Nike Shoes", price: 100 });
  const wrongName = ProductFixture.createPermutation({ id: 2, title: "Cotton Shirt", price: 100 });
  const wrongPrice = ProductFixture.createPermutation({ id: 3, title: "Nike Cap", price: 30 });
  mockProductsAPI([matchingProduct, wrongName, wrongPrice]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);

  // Act
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("textbox", { name: "Product name" }).fill("nike");
  await screen.getByRole("spinbutton", { name: "Min price" }).fill("80");

  // Assert
  await expect.element(screen.getByText(matchingProduct.title)).toBeVisible();
  await expect.element(screen.getByText(wrongName.title)).not.toBeInTheDocument();
  await expect.element(screen.getByText(wrongPrice.title)).not.toBeInTheDocument();
});

test("When clicking reset button, then filters are cleared and all products are shown", async () => {
  // Arrange
  const product1 = ProductFixture.createPermutation({ id: 1, title: "Nike Shoes", price: 100 });
  const product2 = ProductFixture.createPermutation({ id: 2, title: "Cotton Shirt", price: 50 });
  mockProductsAPI([product1, product2]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("textbox", { name: "Product name" }).fill("nike");
  await expect.element(screen.getByText(product2.title)).not.toBeInTheDocument();

  // Act
  await screen.getByRole("button", { name: "Reset" }).click();

  // Assert
  await expect.element(screen.getByText(product1.title)).toBeVisible();
  await expect.element(screen.getByText(product2.title)).toBeVisible();
});

test("When no products match filter criteria, then empty state is displayed", async () => {
  // Arrange
  const product = ProductFixture.createPermutation({ id: 1, title: "Budget Item", price: 50 });
  mockProductsAPI([product]);
  const screen = await render(<BrowserTestProviders router={createProductsRouter()} />);

  // Act
  await screen.getByRole("button", { name: "Filters" }).click();
  await screen.getByRole("spinbutton", { name: "Min price" }).fill("500");

  // Assert
  await expect.element(screen.getByText(product.title)).not.toBeInTheDocument();
  await expect.element(screen.getByRole("heading", { name: "No results found" })).toBeVisible();
});
