import Page from "./page";
import testData from "../testData/episodes";

class playerPage extends Page {
  get videoTitle() {
    return $(".video-player__tile-title");
  }

  get previewButton() {
    return $(".video-player__tile-play");
  }

  get playpauseButton() {
    return $(".video-player__play-pause-icon");
  }

  get videoDuration() {
    return $(".video-player__tile-duration");
  }

  get elapsedDuration() {
    return $(".video-player__time.video-player__time--elapsed");
  }

  open() {
    super.open(testData.episodeLink);
  }

  playDuration() {
    browser.waitUntil(
      () => {
        return this.elapsedDuration.getText() === "02:01";
      },
      130000,
      "Expected duration of play reached",
      1000
    );
  }
}

export default new playerPage();
