const testData = require("../../testdata/apiData");
const expect = require("chai").expect;
const request = require("supertest");
const fs = require("fs");
const path = require("path");

describe("sbs radio location test", () => {
  it("should get hindi radio list", done => {
    request(testData.url)
      .get("/Sydney")
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);

        let response = JSON.parse(res.text);

        fs.writeFileSync("Ouput.JSON", "", err => {
          if (err) throw err;
        });

        fs.writeFileSync(
          "Ouput.JSON",
          "Total MP3 File Count= " + response.length + "\n",
          err => {
            if (err) throw err;
          }
        );

        for (let i = 0; i < response.length; i++) {
          let mp3List = response[i].archiveAudio.mp3;

          fs.appendFileSync("Ouput.JSON", i + " " + mp3List + "\n", err => {
            if (err) throw err;
          });
        }

        done();
      });
  });
});
