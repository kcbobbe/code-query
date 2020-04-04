var express = requirer("express");
var router = express.Router();
var db = require("../models");

db.Question.sync();

router.get("/", (req, res) => {
  db.Question.findAll({ raw: true }).then(data => {
    res.render("index", { questions: parseData(data) })
  })
})

router.get("/api/questions/:id?", (req, res) => {
  if(req.params.id) {
    db.Router.findAll({ raw: true }).then(data => {
      res.json(parseData(data))
    })
  }
})

router.post("/api/questions", (req, res) => {
  const newQ = {
    question_text: req.body.question_text,
    question_tag: req.body.question_tag,
    user_id: req.body.user_id
  }

  db.Question.create(newQ).then(data => {
    res.status(200).end();
  })
  .catch(err => {
    console.log(err);
    res.status(500).end()
  })
})

router.put("/api/questions/:id", (req, res) => {
  const updQ = {
    question_text: req.body.question_text,
    question_tag: req.body.question_tag,
    user_id: req.body.user_id
  }
db.Question.update(updQ, {
  where: { id: req.params.id }
})
.then(function(data) {
  res.status(200.end)
  }).catch(err => {
    console.log(err);
    res.status(500).end();
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
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
  });
});

module.exports = router;