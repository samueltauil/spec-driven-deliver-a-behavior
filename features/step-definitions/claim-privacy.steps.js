import assert from 'node:assert/strict';
import { Given, When, Then } from '@cucumber/cucumber';
import { listDependentClaims, findDependentClaim } from '../../src/claim-status.js';

const routine = { id: 'SYN-ROUTINE', status: 'Processed', billed: 100, planPaid: 80, sensitive: false };
const sensitive = { id: 'SYN-SENSITIVE', status: 'Denied', billed: 900, planPaid: 0, sensitive: true };

Given('a subscriber with a {int} year old dependent', function (age) {
  this.input = { authenticated: true, subscriber: true, dependent: { age, confidential: false }, claims: [] };
});

Given('the dependent has a routine claim and a sensitive claim', function () {
  this.input.claims = [routine, sensitive];
});

Given('the dependent has a confidential communication request', function () {
  this.input.dependent.confidential = true;
});

When("the subscriber lists the dependent's claims", function () {
  this.response = listDependentClaims(this.input);
});

When('the subscriber looks up the sensitive claim directly', function () {
  this.response = findDependentClaim(this.input, sensitive.id);
});

Then('only the routine claim is returned', function () {
  assert.deepEqual(this.response.claims.map((claim) => claim.id), [routine.id]);
});

Then('removing the sensitive claim changes no part of the response', function () {
  assert.deepEqual(this.response, listDependentClaims({ ...this.input, claims: [routine] }));
});

Then('the response matches the response for a child with no claims', function () {
  assert.deepEqual(this.response, listDependentClaims({
    ...this.input, dependent: { age: 9, confidential: false }, claims: []
  }));
});

Then('the response carries the adult privacy message whether or not claims exist', function () {
  assert.deepEqual(this.response, listDependentClaims({ ...this.input, claims: [] }));
  assert.match(this.response.message, /private/);
});

Then('the response matches the response for a claim that does not exist', function () {
  assert.deepEqual(this.response, findDependentClaim(this.input, 'SYN-MISSING'));
  assert.equal(this.response.status, 404);
});
