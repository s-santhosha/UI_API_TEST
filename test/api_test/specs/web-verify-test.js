const fs = require("fs");

describe("sbs radio location test", () => {
  it("should get hindi radio list", () => {
    browser.navigateTo("https://www.sbs.com.au/language/hindi/program");

    let data = fs.readFile("Ouput.JSON", err => {
      if (err) throw err;
    });

    console.log(data);
  });
});
