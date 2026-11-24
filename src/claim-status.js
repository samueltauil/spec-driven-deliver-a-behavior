import { canViewDependentClaim } from './claim-visibility.js';

function visibleClaims({ authenticated, subscriber, dependent, claims }) {
  if (authenticated !== true) throw new Error('Unauthorized');
  if (subscriber !== true) throw new Error('Forbidden');
  return claims.filter((claim) => canViewDependentClaim({
    age: dependent.age, confidential: dependent.confidential, sensitive: claim.sensitive
  }));
}

function project(claim) {
  return { id: claim.id, status: claim.status, billed: claim.billed, planPaid: claim.planPaid };
}

export function listDependentClaims(input) {
  const claims = visibleClaims(input).map(project);
  return {
    claims,
    count: claims.length,
    billed: claims.reduce((total, claim) => total + claim.billed, 0),
    note: 'Dependent claims are subject to privacy rules.',
    ...(Number.isInteger(input.dependent.age) && input.dependent.age >= 18
      ? { message: "Adult dependents' claims are private." } : {})
  };
}

export function findDependentClaim(input, claimId) {
  const claim = visibleClaims(input).find((candidate) => candidate.id === claimId);
  return claim ? { status: 200, body: project(claim) }
    : { status: 404, body: { message: "We can't find this claim." } };
}
