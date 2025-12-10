## Context

The e-commerce application needs cart item removal and wishlist functionality. This is a cross-cutting feature affecting the carts feature, creating a new wishlist feature, adding a new page, and updating navigation.

## Goals / Non-Goals

- Goals:
  - Allow users to remove individual items from their cart
  - Provide persistent wishlist storage for saving products
  - Seamless UX with optimistic updates and toast notifications
  - Follow existing architectural patterns in the codebase

- Non-Goals:
  - Wishlist sharing or public wishlists
  - Multiple wishlists per user
  - Wishlist sync across devices (using local storage is acceptable for MVP)
  - Moving items from wishlist directly to cart (future enhancement)

## Decisions

### Cart Item Removal

- **Decision**: Use optimistic update with background API call
- **Rationale**: Provides instant feedback to users while ensuring data consistency
- **Implementation**: Hook updates React Query cache immediately, then fires API request

### Wishlist Storage

- **Decision**: Use Zustand with localStorage persistence
- **Rationale**: Simple, client-side storage is sufficient for MVP; no backend changes required
- **Alternatives considered**:
  - Backend API storage: More complex, requires auth, overkill for MVP
  - React Context: Less ergonomic than Zustand for persistence

### Cart Item Actions UI

- **Decision**: Use dropdown menu (three-dot icon) for cart item actions
- **Rationale**: Clean UI, doesn't clutter the cart item, scalable for future actions
- **Actions in menu**: Remove from cart, Add to wishlist, Visit product page

## Risks / Trade-offs

- **Risk**: Wishlist data lost if localStorage cleared
  - Mitigation: Acceptable for MVP; can migrate to backend storage later

- **Risk**: Optimistic updates may show stale data if API fails
  - Mitigation: Error handling with rollback or retry mechanism (future enhancement)

## Migration Plan

No migration needed - this is a new feature addition.

## Open Questions

None - straightforward feature implementation.
