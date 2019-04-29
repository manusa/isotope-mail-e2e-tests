Feature: Sidebar
  In order to have information about my mailbox and perform different actions
  As an Isotope Mail Client user
  I want to have a sidebar

  Background:
    Given Main application URL https://isotope.marcnuri.com
    And I login to the application

  Scenario: Sidebar is expanded by default
    When I'm in the main view
    Then Sidebar is expanded by default
