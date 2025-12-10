## 1. Cart Item Removal Infrastructure

- [ ] 1.0 Define all of these tests as test.todo
  - "Remove from cart - removes item from cart display"
  - "Remove from cart - shows success toast"
  - "Remove from cart - last item shows empty cart state"
- [ ] 1.1 Create `remove-from-cart-command.ts` API command in `src/lib/api/carts/{cart-id}/`
- [ ] 1.2 Create `useRemoveFromCart` hook in `src/features/carts/infrastructure/`
- [ ] 1.3 Ensure tests are implemented and pass
- [ ] 1.4 Run the test auditor agent 🕵️‍♀️

## 2. Cart Item Action Menu UI

- [ ] 2.0 Define all of these tests as test.todo
  - "Cart item action menu - displays remove, wishlist, and visit options"
  - "Cart item action menu - remove triggers removal flow"
  - "Cart item action menu - visit navigates to product page"
- [ ] 2.1 Update `CartItem.tsx` to add Menu component with action items
- [ ] 2.2 Connect "Remove" action to `useRemoveFromCart` hook
- [ ] 2.3 Ensure tests are implemented and pass
- [ ] 2.4 Run the test auditor agent 🕵️‍♀️

## 3. Wishlist Store

**Tests to implement:**

- "Wishlist store - adds product to wishlist"
- "Wishlist store - prevents duplicate entries"
- "Wishlist store - removes product from wishlist"
- "Wishlist store - persists to localStorage"

- [ ] 3.1 Create `IWishlistProduct` type in `src/features/wishlist/types/`
- [ ] 3.2 Create `useWishlistStore` Zustand store with localStorage persistence
- [ ] 3.3 Implement `addToWishlist`, `removeFromWishlist`, `isInWishlist` actions
- [ ] 3.4 Verify tests pass for wishlist store

## 4. Add to Wishlist from Cart

**Tests to implement:**

- "Add to wishlist from cart - adds item to wishlist"
- "Add to wishlist from cart - shows success toast"
- "Add to wishlist from cart - item remains in cart"

- [ ] 4.1 Import `useWishlistStore` in `CartItem.tsx`
- [ ] 4.2 Connect "Add to wishlist" menu action to store
- [ ] 4.3 Add toast notification for successful addition
- [ ] 4.4 Verify tests pass for add to wishlist from cart

## 5. Wishlist Page Components

**Tests to implement:**

- "Wishlist page - displays all wishlist items"
- "Wishlist page - shows empty state when no items"
- "Wishlist item - clicking navigates to product"
- "Wishlist item - remove button removes from wishlist"

- [ ] 5.1 Create `WishlistItem.tsx` component in `src/features/wishlist/presentation/`
- [ ] 5.2 Create `WishlistsList.tsx` component with empty state handling
- [ ] 5.3 Create Wishlist page in `src/pages/Wishlist/`
- [ ] 5.4 Add `/wishlist` route to router configuration
- [ ] 5.5 Verify tests pass for wishlist page components

## 6. Wishlist Navigation

**Tests to implement:**

- "Navbar - displays wishlist link"
- "Navbar - wishlist link navigates to wishlist page"

- [ ] 6.1 Add wishlist route constant to `src/lib/router/routes.ts`
- [ ] 6.2 Update `useNavItems.ts` to include wishlist navigation item
- [ ] 6.3 Verify tests pass for wishlist navigation

## 7. Integration Testing

**Tests to implement:**

- "Full flow - add product to cart, remove from cart, verify cart is empty"
- "Full flow - add product to cart, move to wishlist, view in wishlist page"

- [ ] 7.1 Create E2E test for cart removal flow
- [ ] 7.2 Create E2E test for wishlist flow from cart
- [ ] 7.3 Verify all integration tests pass

## 8. Final Validation

- [ ] 8.1 Run `pnpm lint` and fix any issues
- [ ] 8.2 Run `pnpm test` and ensure all tests pass
- [ ] 8.3 Manual smoke test of complete user flow
