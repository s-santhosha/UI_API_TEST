import { Given, When, Then } from "cucumber";
import testData from "../testData/episodes";
import playerPage from "../pages/playerPage";
import { expect } from "chai";

Given(/^I am on the SBS page$/, () => {
  playerPage.open();
});

When(/^I click on preview button$/, () => {
  expect(browser.getTitle()).to.contains(testData.episode);
  playerPage.previewButton.click();
});

Then(/^The video should play on the page$/, () => {
  playerPage.playpauseButton.waitForDisplayed(2000);
  expect(playerPage.playpauseButton.isDisplayed()).to.be.true;
});

When(/^I pause the video$/, () => {
  playerPage.playpauseButton.click();
});

When(/^I play the video for 2 minutes$/, () => {
  playerPage.playpauseButton.click();
  playerPage.playDuration();
});

When(/^I pause the video content$/, () => {
  playerPage.playpauseButton.click();
});

Then(/^The video should stop playing$/, () => {
  expect(playerPage.playpauseButton.isDisplayed()).to.be.true;
});
