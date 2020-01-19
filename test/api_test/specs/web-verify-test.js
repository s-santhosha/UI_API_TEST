const fs = require("fs");
const readline = require("readline");
const lineReader = require("line-reader");

describe("sbs radio location test", () => {
  it("should get hindi radio list", () => {
    browser.navigateTo("https://www.sbs.com.au/language/hindi/program");

    let rows = $$(".audio-playlist__body .audio-playlist__item");
    let rowCount = rows.length;
    console.log("row count is", rowCount);

    lineReader.eachLine("Output.txt", function(line) {
      console.log(line);
    });
  });
});
