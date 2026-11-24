# Proposal: Implement dependent claim privacy

## Why

Subscribers on a Contoso Health Plan family plan can see the claims of the dependents on their plan. Some of those claims must stay private: sensitive services for adolescents, claims of dependents with a confidential communication request, and every claim of an adult dependent. A hidden claim must leave no trace. It must not show up in a list, a count, a billed total, a message or a direct lookup.

## What Changes

- Implement the visibility policy `canViewDependentClaim` in `src/claim-visibility.js`. Today it is a stub that throws `Not implemented`.
- The supplied `src/claim-status.js` already filters every list and lookup through that policy, so no other source file changes.
- The change adds the capability `member-claim-privacy` (requirements `001-FR-011` to `001-FR-013`, scenarios `001-US3-AS1` to `001-US3-AS6`).

## Non-goals

Real identity checks, age calculation from birth dates, an HTTP service, a user interface, explanation-of-benefits downloads, audit logging, caching, timing guarantees, production authorization and legal or compliance review are out of scope. Ages and privacy flags are fictional inputs supplied by the caller. These age rules belong to the fictional Contoso Health Plan, not to any real jurisdiction.

## Approval

The product owner and the privacy lead approved this behavior for delivery. That approval covers the requirements, not the code. The delivery plan still needs a human review before coding starts, and the pull request still needs an independent review before it merges.
