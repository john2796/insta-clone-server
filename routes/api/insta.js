const express = require("express");
const router = express.Router();
const passport = require("passport");

// model
const Insta = require("../../models/Insta");
const validateInstaProfileInput = require("../../validation/validateInstaProfileInput");
// @route   GET api/commentbox/comments
// @desc    get users
// @access  Public
//http://localhost:5000/api/insta
router.get("/", (req, res) => {
  Insta.find((err, posts) => {
    if (err) res.json({ success: false, error: err });
    return res.json({ success: true, posts: posts });
  });
});

// @route   POST api/insta
// @desc    Post comments
// @access  Public
//http://localhost:5000/api/insta
// router.post("/", (req, res) => {
//   const profileFields = {};

//   profileFields.user = req.user.id;
//   if (req.body.isLiked) profileFields.isLiked = req.body.isLiked;
//   if (req.body.username) profileFields.username = req.body.username;
//   if (req.body.thumbnailUrl) profileFields.thumbnailUrl = req.body.thumbnailUrl;
//   if (req.body.imageUrl) profileFields.imageUrl = req.body.imageUrl;
//   if (req.body.likes) profileFields.likes = req.body.likes;

//   Insta.findOne({ user: req.user.id }, profile => {
//     if (profile) {
//       errors.username = "The username already exists";
//       res.status(400).json(errors);
//     }
//     new Insta(profileFields).save().then(profile => res.json(profile));
//   });
// });

// @route   POST api/insta/comments
// @desc    Add comments
// @access  Public
router.post("/api/instagram/:id/comments", (req, res) => {
  const username = req.body.username;
  const comment = req.body.comment;
  if (!username || !comment) {
    res.status(422);
    res.json({ error: "Incomplete Params in Body" });
  }

  Insta.find({ _id: req.params.id }, (err, post) => {
    if (err) return res.status(401).json({ err: "Post Not Found" });
    const newPost = post[0].comments;
    newPost.push({ username, comment });
    post[0].comments = newPost;
    post[0].save().then(() => {
      Insta.find({}, (err, post) => {
        if (err) return err;
        res.json(post.reverse());
      });
    });
  });
});

// @route   POST api/insta
// @desc    Update comments
// @access  Public
//http://localhost:5000/api/insta/:insta:id
router.post("/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  // if (!commentId) {
  //   return res
  //     .status(422)
  //     .json({ success: false, error: "No comment id provided" });
  // }

  Insta.findOne({ _id: commentId }, (error, comment) => {
    if (error) return res.json({ success: false, error });
    const text = req.body.text;
    if (text) comment.text = text;
    comment.save(error => {
      if (error) return res.json({ success: false, error });
      Insta.find({}, (err, comment) => {
        if (err) {
          return res.status(401).json({ err: "failed to fetch comment" });
        }
        res.json(comment);
      });
    });
  });
});

// @route   Delete api/commentbox/comments
// @desc    Delete comments
// @access  Public
//http://localhost:5000/api/comments/:commentId
router.delete("/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res
      .status(400)
      .json({ success: false, error: "No comment id provided" });
  }
  Insta.remove({ _id: commentId }, (error, comment) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
