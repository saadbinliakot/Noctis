import Reaction from "../ReactionModel.js";

const emptyCounts = {
  haunt: 0,
  relate: 0,
  fear: 0,
  lucid: 0,
  myth: 0,
};

const getCounts = async (postId) => {
  const reactions = await Reaction.find({ postId });

  const counts = { ...emptyCounts };

  reactions.forEach((reaction) => {
    counts[reaction.type] = (counts[reaction.type] || 0) + 1;
  });

  return counts;
};

export const reactToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { type } = req.body;
    const userId = req.user._id || req.user.id;

    const existingReaction = await Reaction.findOne({ postId, userId });

    if (existingReaction) {
      existingReaction.type = type;
      await existingReaction.save();
    } else {
      await Reaction.create({ postId, userId, type });
    }

    const counts = await getCounts(postId);

    res.json({ counts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Reaction failed" });
  }
};

export const getReactionSummary = async (req, res) => {
  try {
    const { postId } = req.params;

    const counts = await getCounts(postId);

    res.json({ counts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reactions" });
  }
};