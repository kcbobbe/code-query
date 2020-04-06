// const moment = require("moment");
const express = require("express");
const router = express.Router();
const db = require("../models");

db.Question.sync();

router.get("/", (req, res) => {
  const query = {};
  if (req.query.UserId) {
    query.UserId = req.query.UserId;
  }
  db.Question.findAll({
    raw: true,
    where: query,
    include: [db.User]
  }).then(data => {
    console.log(data);
    res.render("index", { questions: data });
  });
});

router.get("/api/questions", (req, res) => {
  const query = {};
  if (req.query.UserId) {
    query.UserId = req.query.UserId;
  }
  db.Question.findAll({
    where: query,
    include: [db.User]
  }).then(data => {
    res.json(data);
  });
});

router.get("/api/questions/:id?", (req, res) => {
  if (req.params.id) {
    db.Question.findOne({
      where: { id: req.params.id },
      raw: true
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        status(500).end();
      });
  } else {
    db.Question.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

router.post("/api/questions", (req, res) => {
  const newQ = {
    questionText: req.body.questionText,
    questionTag: req.body.questionTag,
    UserId: req.body.UserId,
    date: req.body.date
  };

  db.Question.create(newQ)
    .then(data => {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put("/api/questions/:id", (req, res) => {
  const updQ = {
    questionText: req.body.questionText,
    questionTag: req.body.questionTag,
    userId: req.body.userId,
    date: req.body.date
  };
  db.Question.update(updQ, {
    where: { id: req.params.id }
  })
    .then(function(data) {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
      console.log(data);
    });
});

router.delete("/api/questions/:id", (req, res) => {
  db.Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function(data) {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
