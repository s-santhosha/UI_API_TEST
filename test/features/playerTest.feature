Feature: Test the player functionality

    Background:
        Given I am on the SBS page

    @player
    Scenario: Perform player tests
        When I click on preview button
        Then The video should play on the page
        When I pause the video
        When I play the video for 2 minutes
        And I pause the video content 
        Then The video should stop playing


