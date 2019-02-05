const db = require("../db/models");

const convertForAlexa = (locale) => {
  console.log(JSON.stringify(locale));
  return {
    "uid": locale[internalIdField],
    "updateDate": "2019-01-31T00:00:00.0Z",
    "titleText": locale.query,
    "mainText": locale.query,
    "redirectionUrl": "https://thawing-plains-98515.herokuapp.com/"
  };
};
const internalIdField = "_id";

function removeIds(locale) {
  delete locale.userId;
  delete locale[internalIdField];
  return locale;
}

function addUser(locale, user) {
  if (user) {
    console.log(user);
    locale.userId = user[internalIdField];
  } else {
    locale.userId = null;
  }
  return locale;
}
function checkName(locale) {
    if (!locale) {
        return {
          "locationName": "home"
        };
    }
    if(!locale.locationName) {
        locale.locationName = "home";
    }
    return locale
}
function getLocalesByUser(locale) {
  return db.Locales.find(locale);

}
function getLocaleByUser(locale) {
  return db.Locales.findOne(locale)
}

function find(req) {
    return getLocaleByUser(addUser(checkName(req.body), req.user));
};
function findAll(req) {
    return getLocalesByUser(addUser(req.body, req.user));
}
function createOrUpdate(req, res) {
  return find(req)
      .then(dbLocale => {
        db.Locales.update(
          { internalIdField: locale[internalIdField] }, 
          req.body,
          (err, raw) => {
              if (raw) {
                console.log(raw)
                res.json(raw);
              }
              if (err) {
                console.log(err);
                res.status(422).json(err);
              }
          }
        )
      })
      .err(err => {
        console.log(err);
        const newLocale = addUser(req.body, req.user);
        db.Locales.create(newLocale)
          .then(dbLocale => res.json(dbLocales))
          .catch(err => res.status(422).json(err));
      });
}
// Defining methods for the locale
module.exports = {
  findAll: function(req, res) {
    findAll(req)
      .then(locales => res.json(locales.map(removeIds)))
      .catch(err => res.status(422).json(err));
  },
  find: function(req, res) {
    find(req)
      .then(locale => res.json(removeIds(locale)))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Locales.findById(req.params.id)
      .then(dbLocales => res.json(dbLocales))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res, noRetry) {
    // const newLocale = addUser(req.body, req.user);
    // db.Locales.create(newLocale)
    //   .then(dbLocale => res.json(dbLocales))
    //   .catch(err => res.status(422).json(err));
    createOrUpdate(req, res);
  },
  update: function(req, res, noRetry) {
    createOrUpdate(req, res);
    // find(req)
    //   .then(locale => db.Locales.update(
    //       { internalIdField: locale[internalIdField] }, 
    //       req.body,
    //       (err, raw) => {
    //           if (raw) {
    //             console.log(raw)
    //             res.json(raw);
    //           }
    //           if (err) {
    //             console.log(err);
    //             res.status(422).json(err);
    //           }
    //       }
    //   )).catch(err => res.status(422).json(err));
  },
  alexa: function(req, res) {
    db.Locales.find(req.query)
      .then(locales => locales.map(convertForAlexa))
      .then(alexaItem => res.json(alexaItem))
      .catch(err => res.status(500).json(err));
  }
};
