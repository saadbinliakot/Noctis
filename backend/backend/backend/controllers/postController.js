const nowDhaka = new Date(
  new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Dhaka",
    }
  )
);

const hour =
  nowDhaka.getHours();

if (
  hour < 0 ||
  hour >= 4
) {
  return res.status(403).json({
    message:
      "Posting only allowed from 12AM to 4AM",
  });
}


export const getTrendingTags =
  async (req, res) => {
    try {
      const tags =
        await Post.aggregate([
          {
            $unwind: "$tags",
          },
          {
            $group: {
              _id: "$tags",
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
          {
            $limit: 10,
          },
        ]);

      res.json(tags);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };