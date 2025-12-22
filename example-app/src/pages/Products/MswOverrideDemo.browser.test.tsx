/**
 * Demo: MSW Mock Override Pattern
 *
 * This test file demonstrates how to:
 * 1. Set up default API mocks in beforeEach (via worker.ts)
 * 2. Override specific routes in individual tests with different data
 *
 * Key concept: MSW uses a "last-in, first-out" strategy for handlers.
 * When you call worker.use() with a new handler, it prepends to the handler
 * stack, so the newest handler takes precedence over earlier ones.
 */

import { http, HttpResponse } from "msw";
import { createMemoryRouter } from "react-router";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render } from "vitest-browser-react";

import { host } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { Component as ProductsPage } from "@/pages/Products";
import { productsPageLoader } from "@/pages/Products/loader";
import { BrowserTestProviders } from "@/test-lib/browser-providers";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

import {
  getWorker,
  resetHandlers,
  setupDefaultHandlers,
  startWorker,
  stopWorker,
} from "./worker";

beforeAll(async () => {
  await initializeI18nForBrowser();
  await startWorker();
});

afterAll(() => stopWorker());

beforeEach(() => {
  localStorage.setItem("fake_store_is_authenticated", "true");
  setupDefaultHandlers();
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  queryClient.clear();
  resetHandlers();
});

function createProductsRouter() {
  return createMemoryRouter(
    [
      {
        path: "/products",
        element: <ProductsPage />,
        loader: productsPageLoader,
      },
    ],
    { initialEntries: ["/products"] }
  );
}

describe("MSW Override Demo", () => {
  test("Uses default mocks from beforeEach - shows default products", async () => {
    // This test uses the default handlers from beforeEach
    // No overrides needed - just render and verify defaults work
    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // Assert - should see default products from beforeEach
    await expect.element(screen.getByText("Default Product A")).toBeVisible();
    await expect.element(screen.getByText("Default Product B")).toBeVisible();
  });

  test.only("Overrides products endpoint with custom data", async () => {
    // Override the /products endpoint with different data for this test only
    const customProducts = ProductFixture.createCollection([
      { id: 10, title: "Custom Product Xfoo" },
      { id: 11, title: "Custom Product YXfoo" },
      { id: 12, title: "Custom Product ZXfoo" },
    ]);

    getWorker().use(
      http.get(`${host}/products`, () => HttpResponse.json(customProducts))
    );

    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // Assert - should see custom products, NOT the defaults
    await expect.element(screen.getByText("Custom Product Xfoo")).toBeVisible();
    await expect
      .element(screen.getByText("Custom Product YXfoo"))
      .toBeVisible();
    await expect
      .element(screen.getByText("Custom Product ZXfoo"))
      .toBeVisible();

    // Default products should NOT be present
    expect(screen.getByText("Default Product A").query()).toBeNull();
  });

  test("Overrides only the user endpoint - products remain default", async () => {
    // Override just the user endpoint, products still use defaults
    const customUser = UserFixture.createPermutation({
      id: 999,
      cartId: 999,
    });

    getWorker().use(
      http.get(`${host}/users/:userId`, () => HttpResponse.json(customUser))
    );

    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // Assert - default products are still shown (not overridden)
    await expect.element(screen.getByText("Default Product A")).toBeVisible();
    await expect.element(screen.getByText("Default Product B")).toBeVisible();
  });

  test("Simulates API error by overriding with error response", async () => {
    // Override to return an error - useful for testing error states
    getWorker().use(
      http.get(`${host}/products`, () =>
        HttpResponse.json({ message: "Internal Server Error" }, { status: 500 })
      )
    );

    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // The page should handle the error gracefully
    await expect
      .element(
        screen.getByRole("heading", { name: "Unexpected Application Error!" })
      )
      .toBeVisible();
  });

  test("Overrides with empty array to test empty state", async () => {
    // Override to return empty products list
    getWorker().use(http.get(`${host}/products`, () => HttpResponse.json([])));

    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // Default products should NOT be present (we overrode with empty)
    expect(screen.getByText("Default Product A").query()).toBeNull();
    expect(screen.getByText("Default Product B").query()).toBeNull();
  });

  test("Captures request payload while overriding response", async () => {
    // Override PUT endpoint to capture what was sent AND return custom response
    let capturedPayload: unknown;

    getWorker().use(
      http.put(`${host}/carts/:cartId`, async ({ request }) => {
        capturedPayload = await request.json();
        return HttpResponse.json({ success: true, cartId: 42 });
      })
    );

    const screen = await render(
      <BrowserTestProviders router={createProductsRouter()} />
    );

    // Click add to cart
    const addButton = screen
      .getByRole("button", { name: "Add to cart" })
      .first();
    await expect.element(addButton).toBeVisible();
    await addButton.click();

    // Verify the captured payload
    await expect.poll(() => capturedPayload).toBeTruthy();
    expect(capturedPayload).toMatchObject({
      products: expect.arrayContaining([
        expect.objectContaining({ productId: expect.any(Number) }),
      ]),
    });
  });
});
