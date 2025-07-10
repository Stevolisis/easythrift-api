const Achievements = require("./achievements");

const AchievementsList = [
  // Snippet Achievements (13)
  {
    key: "first_snip",
    title: "🏅 First Snip",
    description: "You posted your first snippet!",
    xp: 15, // CHANGED: was 35
    category: "snippet"
  },
  {
    key: "active_poster",
    title: "🏅 Active Poster",
    description: "10 snippets posted!",
    xp: 40, // CHANGED: was 100
    category: "snippet"
  },
  {
    key: "upvoted_author",
    title: "🏅 Upvoted Author",
    description: "15 snippets with 15+ upvotes!",
    xp: 60, // CHANGED: was 150
    category: "snippet"
  },
  {
    key: "snippet_veteran",
    title: "🏅 Snippet Veteran",
    description: "50 public snippets!",
    xp: 80, // CHANGED: was 200
    category: "snippet"
  },
  {
    key: "fork_smith",
    title: "🏅 Fork Smith",
    description: "Forked 5 different snippets with each having 15+ upvotes",
    xp: 80, // CHANGED: was 200
    category: "snippet"
  },
  {
    key: "top_snip",
    title: "🏅 Top Snip",
    description: "50+ upvotes on a snippet!",
    xp: 50, // CHANGED: was 120
    category: "snippet"
  },
  {
    key: "forked_favorite",
    title: "🏅 Forked Favorite",
    description: "A single snippet forked 10+ times by others",
    xp: 80, // CHANGED: was 200
    category: "snippet"
  },
  {
    key: "tip_jar",
    title: "🏅 Tip Jar",
    description: "Receive tips on 3 different snippets",
    xp: 60, // CHANGED: was 150
    category: "snippet"
  },
  {
    key: "rising_snip",
    title: "🏅 Rising Snip",
    description: "One snippet gets 100+ upvotes",
    xp: 70, // CHANGED: was 160
    category: "snippet"
  },
  {
    key: "popular_creator",
    title: "🏅 Popular Creator",
    description: "One snippet gets 1000+ upvotes",
    xp: 100, // CHANGED: was 230
    category: "snippet"
  },
  {
    key: "viral_snip",
    title: "🏅 Viral Snip",
    description: "One snippet gets 10000+ upvotes",
    xp: 200, // CHANGED: was 1000 (massive reduction)
    category: "snippet"
  },
  {
    key: "js_commander",
    title: "🛠️ JS Commander",
    description: "10 JS/TS snippets with 5+ upvotes",
    xp: 60, // CHANGED: was 150
    category: "snippet"
  },
  {
    key: "rust_commander",
    title: "🛠️ Rust Commander",
    description: "10 Rust snippets with 5+ upvotes",
    xp: 60, // CHANGED: was 150
    category: "snippet"
  },

  // Comment Achievements (7)
  {
    key: "first_comment",
    title: "🏅 First Comment",
    description: "You posted your first comment!",
    xp: 12, // CHANGED: was 30
    category: "comment"
  },
  {
    key: "early_feedback",
    title: "🏅 Early Feedback",
    description: "First to comment on 5 snippets",
    xp: 40, // CHANGED: was 100
    category: "comment"
  },
  {
    key: "helpful_voice",
    title: "🏅 Helpful Voice",
    description: "One comment gets 10+ upvotes",
    xp: 40, // CHANGED: was 100
    category: "comment"
  },
  {
    key: "respected_insight",
    title: "🏅 Respected Insight",
    description: "A comment got 100+ upvotes!",
    xp: 100, // CHANGED: was 300
    category: "comment"
  },
  {
    key: "comment_legend",
    title: "🏅 Comment Legend",
    description: "A comment got 1000+ upvotes!",
    xp: 150, // CHANGED: was 300
    category: "comment"
  },
  {
    key: "community_helper",
    title: "🏅 Community Helper",
    description: "Post 25 comments on different snippets",
    xp: 100, // CHANGED: was 300
    category: "comment"
  },
  {
    key: "trusted_by_devs",
    title: "🏅 Trusted by Devs",
    description: "Receive replies from 10 different users",
    xp: 60, // CHANGED: was 150
    category: "comment"
  },

  // Engagement Achievements (4)
  {
    key: "30_day_flame",
    title: "🔥 30-Day Flame",
    description: "Engage daily for 30 days",
    xp: 120, // CHANGED: was 400
    category: "engagement"
  },
  {
    key: "100_day_flame",
    title: "🔥 100-Day Flame",
    description: "Engage daily for 100 days",
    xp: 200, // CHANGED: was 700
    category: "engagement"
  },
  {
    key: "500_day_flame",
    title: "🔥 500-Day Flame",
    description: "Engage daily for 500 days",
    xp: 300, // CHANGED: was 1000
    category: "engagement"
  },
  {
    key: "tipper",
    title: "💰 Tipper",
    description: "Tip 10 different users",
    xp: 40, // CHANGED: was 100
    category: "engagement"
  },

  // Profile & Social Achievements (8)
  {
    key: "complete_profile",
    title: "🏅 Complete Profile",
    description: "Add GitHub and Twitter Link, About, followedTags",
    xp: 20, // CHANGED: was 50
    category: "social"
  },
  {
    key: "og_snipper",
    title: "🏅 OG Snipper",
    description: "Join as one of the first 100 users",
    xp: 60, // CHANGED: was 150
    category: "social"
  },
  {
    key: "first_follower",
    title: "🏅 First Follower",
    description: "Gain your first follower",
    xp: 20, // CHANGED: was 50
    category: "social"
  },
  {
    key: "audience_builder",
    title: "🏅 Audience Builder",
    description: "Reach 20 followers",
    xp: 70, // CHANGED: was 180
    category: "social"
  },
  {
    key: "dev_to_watch",
    title: "🏅 Dev to Watch",
    description: "Reach 50 followers",
    xp: 100, // CHANGED: was 250
    category: "social"
  },
  {
    key: "trusted_voice",
    title: "🏅 Trusted Voice",
    description: "Reach 100 followers",
    xp: 150, // CHANGED: was 400
    category: "social"
  },
  {
    key: "influential_dev",
    title: "🏅 Influential Dev",
    description: "Reach 1000 followers",
    xp: 250, // CHANGED: was 700
    category: "social"
  },
  {
    key: "featured_builder",
    title: "🏅 Featured Builder",
    description: "Get featured on homepage",
    xp: 200, // CHANGED: was 700
    category: "social"
  }
];


// Subscription tiers
const SubscriptionPlans = {
    FREE: {
        name: "Free",
        price: 0,
        codeBlocks: 3,
        maxCodeLines: 160,
        descriptionLimit: 1000,
        commentLength: 1400,
        privateSnippets: 0,
        folders: 0,
        premiumTemplates: false,
        artboards: 5,
        designElements: 20,
        exportFormat: ["png","jpg"],
        exportAllArtboardAsPng: false,
        exportAllArtboardAsSvg: false,
        exportAllArtboardAsPdf: false,
        canPublish: false,
    },
    PRO: {
        name: "Pro",
        price: 3.99,
        codeBlocks: 6,
        maxCodeLines: 320,
        descriptionLimit: 3000,
        commentLength: 2400,
        privateSnippets: 15,
        folders: 5,
        premiumTemplates: true,
        artboards: 15,
        designElements: 50,
        exportFormat: ["png","jpg","svg","pdf"],
        exportAllArtboardAsPng: true,
        exportAllArtboardAsSvg: false,
        exportAllArtboardAsPdf: false,
        canPublish: false,
    },
    ELITE: {
        name: "Elite",
        price: 10,
        codeBlocks: 10,
        maxCodeLines: 640,
        descriptionLimit: 6000,
        commentLength: 5000,
        privateSnippets: Infinity,
        folders: Infinity,
        premiumTemplates: true,
        artboards: Infinity,
        designElements: Infinity,
        exportFormat: ["png","jpg","svg","pdf"],
        exportAllArtboardAsPng: true,
        exportAllArtboardAsSvg: true,
        exportAllArtboardAsPdf: true,
        canPublish: false,
    },
};

const DevRanks = [
  { title: "Cadet", threshold: 0, multiplier: 1.0 },
  { title: "Contributor", threshold: 600, multiplier: 1.05 },
  { title: "Builder", threshold: 1400, multiplier: 1.10 },
  { title: "Explorer", threshold: 2800, multiplier: 1.15 },
  { title: "Innovator", threshold: 5000, multiplier: 1.20 },
  { title: "Strategist", threshold: 7500, multiplier: 1.25 },
  { title: "Architect", threshold: 10500, multiplier: 1.30 },
  { title: "Mentor", threshold: 14000, multiplier: 1.35 },
  { title: "Visionary", threshold: 19000, multiplier: 1.40 },
  { title: "Icon", threshold: 25000, multiplier: 1.50 },
];

function getRankByXP(xp) {
  return DevRanks.reduce((acc, rank) => (xp >= rank.threshold ? rank : acc), DevRanks[0]);
}

// XP Actions
const XP_ACTIONS = {
  //user
  POST_SNIPPET: 15,

  //snippet and user
  SNIPPET_UPVOTE: 2,
  SNIPPET_DOWNVOTE: -1,
  SNIPPET_FORK: 4,
  SNIPPET_TIPPED: 6,

  //snippet
  // SNIPPET_COMMENT: 5,

  //user
  POST_COMMENT: 4,  
  DELETE_COMMENT: -4,  
  REPLY_COMMENT: 2.5,
  COMMENT_UPVOTE: 1,
  COMMENT_DOWNVOTE: -0.5,

  //user
  UPVOTE_SNIPPET: 1,
  DOWNVOTE_SNIPPET: -0.5,
  TIP_USER: 3,
  FORK_SNIPPET: 2,

  //user
  GAIN_FOLLOWER: 5,
  LOSE_FOLLOWER: -5,
  FOLLOW_USER: 2,
  UNFOLLOW_USER: -2,
  DAILY_LOGIN: 2,
  COMPLETE_PROFILE: 10,
};


async function addXp(userId, actionType, models, context = {}) {
  const { User, Snippet, Comment } = models;

  // Validate action
  if (!(actionType in XP_ACTIONS)) {
    throw new Error(`Invalid XP action: ${actionType}`);
  }

  const baseXp = XP_ACTIONS[actionType];
  let finalXp = baseXp;
  let snippetXpAdded = null;

  // Determine if the action is for user, snippet, or both
  const userOnlyActions = [
    "POST_SNIPPET", "POST_COMMENT", "DELETE_COMMENT", "REPLY_COMMENT", "COMMENT_UPVOTE", "COMMENT_DOWNVOTE",
    "UPVOTE_SNIPPET", "DOWNVOTE_SNIPPET", "TIP_USER", "FORK_SNIPPET",
    "GAIN_FOLLOWER", "FOLLOW_USER", "DAILY_LOGIN", "SET_PROFILE"
  ];

  const bothUserAndSnippetActions = [
    "SNIPPET_UPVOTE", "SNIPPET_DOWNVOTE", "SNIPPET_TIPPED", "SNIPPET_FORK"
  ];

  // Update User XP if applicable
  if (userOnlyActions.includes(actionType) || bothUserAndSnippetActions.includes(actionType)) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const currentRank = getRankByXP(user.xp || 0);
    finalXp = baseXp * currentRank.multiplier;
    console.log("user: ", finalXp);
    user.xp += finalXp;
    await user.save();
  }

  // Update Snippet XP if applicable
  const snippetAffectingActions = [...bothUserAndSnippetActions, "POST_COMMENT", "DELETE_COMMENT", "COMMENT_UPVOTE", "COMMENT_DOWNVOTE", "REPLY_COMMENT"];

  if (snippetAffectingActions.includes(actionType)) {
    // From context.snippetId
    if (context.snippetId) {
      const snippet = await Snippet.findById(context.snippetId);
      if (snippet) {
        snippet.rank += baseXp;
        await snippet.save();
        snippetXpAdded = baseXp;
      }
    }

    // From commentId → snippetId
    else if (context.commentId) {
      const comment = await Comment.findById(context.commentId);
      console.log("Comment: ", comment);
      if (comment && comment.contentRef.entity) {
        const snippet = await Snippet.findById(comment.contentRef.entity);
        console.log("insidec reward: ", snippet);
        if (snippet) {
          snippet.rank += baseXp;
          await snippet.save();
          snippetXpAdded = baseXp;
        }
      }
    }
  }

  return {
    xpGained: userOnlyActions.includes(actionType) || bothUserAndSnippetActions.includes(actionType) ? finalXp : 0,
    snippetXpAdded,
    action: actionType
  };
}


async function checkForNewAchievements(userId, models) {
  const { User } = models;
  
  // 1. Get user with only achievements field
  const user = await User.findById(userId).select('achievements');
  if (!user) return { unlocked: [] };

  const unlocked = [];
  const existingKeys = new Set(user.achievements.map(a => a.key));

  // 2. Simple loop with duplicate check
  for (const achievement of Achievements) {
    if (existingKeys.has(achievement.key)) continue;
    
    try {
      const conditionMet = await achievement.condition(userId, models);
      if (conditionMet) {
        user.achievements.push({
          key: achievement.key,
          title: achievement.title,
          description: achievement.description,
          xp: achievement.xp,
          claimed: false,
          unlockedAt: new Date() // Added for tracking
        });
        unlocked.push(achievement);
        existingKeys.add(achievement.key); // Prevent same-loop duplicates
      }
    } catch (err) {
      console.error(`Skipping ${achievement.key}:`, err.message);
    }
  }

  // 3. Save only if needed
  if (unlocked.length > 0) {
    await user.save();
  }

  return { unlocked };
}

async function claimAchievement(userId, achievementKey, models) {
  const { User } = models;
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const achievement = user.achievements.find(a => 
    a.key === achievementKey && !a.claimed
  );

  if (!achievement) throw new Error('No unclaimed achievement found');

  // Mark as claimed and add XP
  achievement.claimed = true;
  user.xp += achievement.xp;
  await user.save();

  return {
    xpEarned: achievement.xp,
    newTotalXp: user.xp
  };
}

async function claimAllAchievements(userId, models) {
  const { User } = models;
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const unclaimed = user.achievements.filter(a => !a.claimed);
  if (unclaimed.length === 0) throw new Error('No achievements to claim');

  const totalXp = unclaimed.reduce((sum, a) => sum + a.xp, 0);

  // Mark all as claimed
  unclaimed.forEach(a => { a.claimed = true; });
  user.xp += totalXp;
  await user.save();

  return {
    count: unclaimed.length,
    xpEarned: totalXp,
    newTotalXp: user.xp
  };
}


module.exports = {
  SubscriptionPlans,
  DevRanks,
  XP_ACTIONS,
  getRankByXP,
  addXp,
  checkForNewAchievements,
  claimAchievement,
  claimAllAchievements
};