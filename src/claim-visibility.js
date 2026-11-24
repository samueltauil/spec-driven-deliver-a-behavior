// Decides whether a subscriber may see one claim of a dependent.
// The approved rules are in openspec/changes/implement-dependent-privacy/specs/member-claim-privacy/spec.md.
export function canViewDependentClaim({ age, confidential, sensitive }) {
  throw new Error('Not implemented');
}
