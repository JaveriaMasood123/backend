const express = require("express");
const UserProfile = require("../models/UserProfile");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// CREATE or UPDATE PROFILE
router.post("/", auth, async (req, res) => {
  const { name, email, skills, projects, github } = req.body;
  try {
    let profile = await UserProfile.findOne({ userId: req.user });
    if (profile) {
      profile.name = name;
      profile.email = email;
      profile.skills = skills;
      profile.projects = projects;
      profile.github = github;
      await profile.save();
      return res.json(profile);
    }
    profile = new UserProfile({ name, email, skills, projects, github, userId: req.user });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// GET OWN PROFILE
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
