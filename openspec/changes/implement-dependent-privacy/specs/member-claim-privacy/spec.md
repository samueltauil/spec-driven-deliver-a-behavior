# Member claim privacy

## Purpose
Decide which fictional dependent claims a subscriber (a parent or guardian) may see, and keep hidden claims from changing list or direct-lookup responses.

## ADDED Requirements

### Requirement: 001-FR-011
The visibility policy MUST hide a claim when the dependent's age is unknown, negative or not a whole number, or when either privacy flag is unknown. It MUST hide every claim of a dependent who has a confidential communication request, and every claim of a dependent aged 18 or older. Otherwise it MUST show every claim of a dependent under 13, and only non-sensitive claims of a dependent aged 13 through 17.

#### Scenario: 001-US3-AS1
- GIVEN a 16-year-old dependent with known privacy facts and no confidential communication request
- WHEN a routine claim and a sensitive claim are evaluated
- THEN the routine claim is visible and the sensitive claim is hidden

#### Scenario: 001-US3-AS2
- GIVEN a 9-year-old dependent whose confidential communication request status is unknown
- WHEN a routine claim is evaluated
- THEN the claim is hidden

#### Scenario: 001-US3-AS3
- GIVEN a 9-year-old dependent with a confidential communication request and two claims
- WHEN the subscriber lists the dependent's claims
- THEN the response matches the response for a 9-year-old dependent with no claims

### Requirement: 001-FR-012
The claim list MUST include only visible claims and MUST calculate counts and billed totals only from them. Adding a hidden claim MUST NOT change any field of the list response. The adult privacy message MUST NOT depend on whether the dependent has claims.

#### Scenario: 001-US3-AS4
- GIVEN a 16-year-old dependent with a routine claim and a sensitive claim
- WHEN the list is compared with the list for the routine claim alone
- THEN the two responses are identical

#### Scenario: 001-US3-AS5
- GIVEN a 19-year-old dependent
- WHEN the subscriber lists the dependent's claims, once with two claims and once with none
- THEN the two responses are identical and both carry the adult privacy message

### Requirement: 001-FR-013
A direct lookup MUST return the same status and body for a hidden claim as for a claim that does not exist. Only callers marked as authenticated subscribers MAY list or look up a dependent's claims.

#### Scenario: 001-US3-AS6
- GIVEN a subscriber who cannot see a 16-year-old dependent's sensitive claim
- WHEN the subscriber looks up that claim and a claim ID that does not exist
- THEN both responses have status 404 and the same body
