import videoService from "../services/video";

const { HOST, PORT } = process.env;

async function create(req, res) {
  const { url } = req.body;

  try {
    // Save video to tmp
    const video_dest = await videoService.download(url);

    res.send({ success: true, url: `${HOST}/${video_dest}` });

    // Send video to normalize
    // Returns normalized video dest

    /*
    const normalized_dest = await videoService.normalize(url);
  
    const normalize_video = `${HOST}:${PORT}/${normalized_dest}`;
  
    res.send({ success: true, url: normalize_video });
    */
  } catch (e) {
    res.send({ success: false, error: e.message });
  }
}

export default { create };
