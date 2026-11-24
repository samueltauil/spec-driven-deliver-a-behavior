@001
Feature: Dependent claim privacy
  A subscriber can see some, but not all, of a dependent's claims.
  These fictional age rules belong to Contoso Health Plan, not to any real jurisdiction.

  @001-US3-AS4 @001-FR-012
  Scenario: A sensitive adolescent claim leaves no trace in the list
    Given a subscriber with a 16 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber lists the dependent's claims
    Then only the routine claim is returned
    And removing the sensitive claim changes no part of the response

  @001-US3-AS3 @001-FR-011
  Scenario: A confidential child looks like a child with no claims
    Given a subscriber with a 9 year old dependent
    And the dependent has a routine claim and a sensitive claim
    And the dependent has a confidential communication request
    When the subscriber lists the dependent's claims
    Then the response matches the response for a child with no claims

  @001-US3-AS5 @001-FR-012
  Scenario: An adult dependent's privacy message reveals no claims
    Given a subscriber with a 19 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber lists the dependent's claims
    Then the response carries the adult privacy message whether or not claims exist

  @001-US3-AS6 @001-FR-013
  Scenario: A hidden claim looks like a claim that does not exist
    Given a subscriber with a 16 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber looks up the sensitive claim directly
    Then the response matches the response for a claim that does not exist
