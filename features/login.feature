Feature: Login
  In order to access my mailbox
  As an Isotope Mail Client User
  I want to be able to login

  Scenario Outline: Fixed route exists for login page (<browser>)
    Given <browser> browser and a fixed login route URL https://isotope.marcnuri.com/login
    When I access this URL to login
    Then I'm shown a login page with a form to input my credentials

  Examples:
  | browser |
  | chrome  |
  | firefox |
  | edge    |

  Scenario: Root URL redirects to login page if no session was started
    Given Isotope's base URL https://isotope.marcnuri.com
    When I access this URL without a session
    Then I'm redirected to the login page

  Scenario Outline: I can login to the application (<browser>)
    Given <browser> browser and a login form in the URL https://isotope.marcnuri.com
    When I fill in and submit the login form
    Then I'm logged in and redirected to the main application page

    Examples:
    | browser |
    | chrome  |
    | firefox |
    | edge    |
