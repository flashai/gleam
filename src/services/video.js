import fs from "fs";
import yt from "youtube-dl";
import path from "path";
import uuid from "uuid/v4";

import axios from "axios";

const { VIDEO_URL } = process.env;

const vi = axios.create({ baseURL: VIDEO_URL, timeout: 500000 });

/**
 * Normalize video
 * @param {String} url
 * @returns {String}
 */
async function normalize(url) {
  const { data } = await vi.post("/", { url });

  return data;
}

/**
 * Download video
 * @param {String} url
 * @returns {String}
 */
function download(url) {
  return new Promise((resolve, reject) => {
    const video = yt(url, ["--format=18"], { cwd: __dirname });

    // Default name

    // Once video begins download
    video.on("info", info => console.log("Video: " + info._filename));

    // Video destination
    let video_name = `${uuid()}.mp4`;
    const dest = path.resolve(`tmp/${video_name}`);

    // Piping video into dest
    video.pipe(fs.createWriteStream(dest));

    video.on("end", () => resolve(`tmp/${video_name}`));
  });
}

export default { normalize, download };
