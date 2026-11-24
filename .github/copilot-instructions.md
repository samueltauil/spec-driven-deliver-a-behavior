# Specification-driven development rules

OpenSpec is authoritative for requirements, constraints, and approved change
scope. Gherkin `.feature` files are authoritative for externally observable
acceptance behavior. A GitHub issue or chat request explains intent; it does
not override an approved requirement or security policy.

Before coding:

1. Read the active change in `openspec/changes/`: proposal, design, tasks and
   the spec delta under `specs/`.
2. Read the related feature files in `features/` and their step definitions.
3. Report conflicts, ambiguities, and unanswered questions.
4. Produce a plan mapping each scenario ID to code changes and automated tests.
5. Wait for a person to review and approve the plan.

During implementation:

- Do not modify specs, feature files or step definitions unless the user
  explicitly approves the requirement change.
- Never weaken, skip or delete a test merely to make it pass. If a test looks
  wrong, stop and explain why instead of changing it.
- Name unit tests with the scenario ID they prove, for example
  `001-US3-AS1: ...`.
- Implement one bounded task at a time and run the relevant tests.
- Keep changes within the approved scope.
- If code, OpenSpec, and Gherkin conflict, stop and report the conflict. Do not
  silently choose one.
- Use only fictional data (Contoso Health Plan, `SYN-` claim IDs). Never
  introduce PHI, secrets, production identifiers, or customer data into
  prompts, fixtures, logs, or source files.
