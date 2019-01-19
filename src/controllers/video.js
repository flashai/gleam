import fs from "fs";
import yt from "youtube-dl";
import path from "path";

const create = (req, res) => {
  const { url } = req.params;

  try {
    const video = yt(url, ["--format=18"], { cwd: __dirname });

    // Default name
    let video_name = "video.mp4";

    // Once video begins download
    video.on("info", info => {
      video_name = info.filename;

      console.log("Download started");
      console.log("filename: " + info.filename);
      console.log("size: " + info.size);
    });

    // Video destination
    const dest = path.resolve(`tmp/${video_name}`);

    // Piping video into dest
    video.pipe(fs.createWriteStream(dest));
  } catch (e) {
    res.send({ success: false, e });
  }
};

export default { create };
