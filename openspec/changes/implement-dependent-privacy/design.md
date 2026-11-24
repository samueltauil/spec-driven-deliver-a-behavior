# Design: Implement dependent claim privacy

The repository uses JavaScript ES modules, `node:test` for unit tests and Cucumber.js for the Gherkin feature.

## Components

| File | Role | Changes in this delivery? |
| --- | --- | --- |
| `src/claim-visibility.js` | Pure policy: `canViewDependentClaim({ age, confidential, sensitive })` returns `true` or `false` | Yes, replaces the stub |
| `src/claim-status.js` | `listDependentClaims` and `findDependentClaim` filter claims through the policy before they build any response | No |
| `features/claim-privacy.feature` | Acceptance examples tagged with scenario and requirement IDs | No |
| `features/step-definitions/claim-privacy.steps.js` | Runs the feature against `src/claim-status.js` | No |
| `tests/` | Unit tests named with scenario IDs, written before the code | Yes, new |

## Decisions

- **Fail closed.** Any unknown fact (age, confidential communication request, sensitivity) hides the claim.
- **Filter first.** The list and the lookup search only the visible claims, so counts, totals and the 404 body cannot reveal a hidden one.
- **Fictional inputs.** Age arrives as a whole number and the privacy flags as booleans. Nothing is computed from real dates or real people.

## Risks

- A policy that is correct for each claim can still leak through a response field that nobody compared. The feature compares complete responses for that reason.
- Green tests prove only the examples they run. They do not prove production authorization, audit logging or timing behavior.
