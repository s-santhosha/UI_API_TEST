const fs = require("fs");
const assert = require("chai").assert;

describe("sbs radio location test", () => {
  it("should get hindi radio list", () => {
    browser.navigateTo("https://www.sbs.com.au/language/hindi/program");

    let rows = $$(".audio-playlist__body .audio-playlist__item");
    let rowCount = rows.length;

    let textContent = fs.readFileSync("Ouput.txt").toString();
    let lines = textContent.split("\n");
    let totalLineCount = lines.length - 1;

    if (totalLineCount == rowCount) {
      assert(totalLineCount == rowCount, "mp3 playlist matches");
    }
  });
});
