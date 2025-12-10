## ADDED Requirements

### Requirement: Add Product to Wishlist from Cart

The system SHALL allow users to add products to their wishlist from the shopping cart.

#### Scenario: User adds cart item to wishlist

- **WHEN** the user clicks "Add to wishlist" from a cart item's action menu
- **THEN** the product is added to the user's wishlist
- **AND** a success toast notification confirms "Added to wishlist"
- **AND** the product remains in the cart (not moved, just copied)

#### Scenario: User adds duplicate product to wishlist

- **WHEN** the user adds a product that already exists in their wishlist
- **THEN** the wishlist does not create a duplicate entry
- **AND** the success toast is still shown (idempotent operation)

### Requirement: Wishlist Persistence

The system SHALL persist wishlist data across browser sessions using local storage.

#### Scenario: User returns to site after closing browser

- **WHEN** the user closes the browser and returns to the site later
- **THEN** their wishlist items are still present and displayed correctly

#### Scenario: User clears browser storage

- **WHEN** the user clears their browser local storage
- **THEN** the wishlist is reset to empty

### Requirement: View Wishlist Page

The system SHALL provide a dedicated page to view and manage wishlist items.

#### Scenario: User navigates to wishlist page with items

- **WHEN** the user navigates to the wishlist page and has saved items
- **THEN** all wishlist items are displayed with product image, title, category, and price
- **AND** each item has a "Remove" button

#### Scenario: User views empty wishlist

- **WHEN** the user navigates to the wishlist page with no saved items
- **THEN** an empty state is displayed with a message and "Browse Products" action button

#### Scenario: User clicks on wishlist item

- **WHEN** the user clicks on a wishlist item's title or image
- **THEN** they are navigated to that product's detail page

### Requirement: Remove Product from Wishlist

The system SHALL allow users to remove products from their wishlist.

#### Scenario: User removes product from wishlist

- **WHEN** the user clicks "Remove" on a wishlist item
- **THEN** the product is immediately removed from the wishlist display
- **AND** the item is removed from local storage

#### Scenario: User removes last item from wishlist

- **WHEN** the user removes the only item in their wishlist
- **THEN** the empty wishlist state is displayed

### Requirement: Wishlist Navigation

The system SHALL provide navigation to the wishlist page from the main navbar.

#### Scenario: User accesses wishlist from navbar

- **WHEN** the user clicks the "Wishlist" link in the navigation bar
- **THEN** they are navigated to the wishlist page
