const db = require("../db/models");

const convertForAlexa = (locale) => {
  console.log(JSON.stringify(locale));
  return {
    "uid": locale["_id"],
    "updateDate": "2019-01-31T00:00:00.0Z",
    "titleText": locale.query,
    "mainText": locale.query,
    "redirectionUrl": "https://thawing-plains-98515.herokuapp.com/"
  };
};
// Defining methods for the localelist
module.exports = {
  findAll: function(req, res) {
    db.Locales.find(req.query)
      .then(dbLocales => res.json(dbLocales))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    if (req.user) {
      db.Locales.find({"userId": req.user._id, "locationName" : "home"})
      .then(dbLocales => dbLocales ? res.json(dbLocales) : this.findAll(req, res))
      .catch(err => {
        console.log(err);
        this.findAll(req, res);
      })
    } else {
      this.findAll(req, res);
    }

  },
  findById: function(req, res) {
    db.Locales.findById(req.params.id)
      .then(dbLocales => res.json(dbLocales))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const locale = res.body;
    if (req.user) {
      locale.userId = req.user._id;
    }
    db.Locales.create(locale)
      .then(dbLocales => res.json(dbLocales))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Locales.update({ _id: req.params.id }, req.body, (err, raw) => {
      if (raw) {
        console.log(raw)
        res.json(raw);
      }
      if (err) {
        console.log(err);
        res.json(err);
      }
    });
  },
  alexa: function(req, res) {
    db.Locales.find(req.query)
      .then(locales => locales.map(convertForAlexa))
      .then(alexaItem => res.json(alexaItem))
      .catch(err => res.status(500).json(err));
  }
};
