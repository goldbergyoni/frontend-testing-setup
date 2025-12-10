# Change: Add Cart Item Removal and Wishlist Feature

## Why

Currently, users can add products to their shopping cart but have no way to remove individual items (only clear the entire cart). Additionally, there's no wishlist functionality to save products for later purchase. These are standard e-commerce features that improve user experience and reduce cart abandonment.

## What Changes

- **Cart Item Removal**: Users can remove individual products from their shopping cart via an action menu on each cart item
- **Wishlist Feature**: Users can save products to a persistent wishlist for future consideration
  - Add to wishlist from cart items
  - Dedicated wishlist page to view saved products
  - Remove items from wishlist
- **Navigation**: Add wishlist link to navbar for easy access

## Impact

- Affected specs: `cart-management`, `wishlist` (new capability)
- Affected code:
  - `src/features/carts/presentation/CartItem.tsx` - Add action menu with remove and wishlist options
  - `src/features/carts/infrastructure/useRemoveFromCart.ts` - Hook for remove operation
  - `src/lib/api/carts/{cart-id}/remove-from-cart-command.ts` - API command
  - `src/features/wishlist/` - New feature module (store, components, types)
  - `src/pages/Wishlist/` - New wishlist page
  - `src/lib/router/routes.ts` - Add wishlist route
  - `src/lib/components/Layout/Navbar/` - Add wishlist nav item
