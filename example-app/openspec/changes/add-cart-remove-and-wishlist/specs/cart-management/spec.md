## ADDED Requirements

### Requirement: Remove Product from Cart

The system SHALL allow users to remove individual products from their shopping cart.

#### Scenario: User removes a product from cart via action menu

- **WHEN** the user clicks the action menu on a cart item and selects "Remove"
- **THEN** the product is immediately removed from the cart display (optimistic update)
- **AND** a DELETE request is sent to the API endpoint `carts/{cartId}/products/{productId}`
- **AND** a success toast notification is shown confirming the removal

#### Scenario: User removes the last item from cart

- **WHEN** the user removes the only product in their cart
- **THEN** the cart page displays an empty cart state with a "Continue Shopping" prompt

#### Scenario: Remove operation fails due to network error

- **WHEN** the user removes a product but the API request fails
- **THEN** the item remains removed from the UI (fire-and-forget pattern)
- **AND** the error is logged for debugging purposes

### Requirement: Cart Item Action Menu

The system SHALL provide an action menu on each cart item with multiple options.

#### Scenario: User opens cart item action menu

- **WHEN** the user clicks the three-dot menu icon on a cart item
- **THEN** a dropdown menu appears with the following options: "Remove", "Add to wishlist", "Visit product page"

#### Scenario: User navigates to product page from cart

- **WHEN** the user selects "Visit product page" from the action menu
- **THEN** the user is navigated to the product detail page for that item
