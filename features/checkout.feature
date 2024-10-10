Feature: Swag Labs - Checkout

  Scenario: Verify that user can successfully complete the checkout for the selected products in the cart
    Given standardUser is logged in and navigated to Swag Labs - products page
    And selected 3 products
    And reviewed selected products in the cart
    When standardUser clicks on the checkout button and continues with the checkout information
    Then standardUser should see checkout overview
    And presented with sucessful checkout message after clicking on the finish button
