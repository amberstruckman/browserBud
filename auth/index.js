const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')
const db = require("../db/models");

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get("/user", (req, res, next) => {
	if (req.user) {
    db.User.findOne(
      { _id: req.user._id }
    ).then(function(dbResult) {
      return res.json({ user: req.user, browser: dbResult.browser });
    }).catch(function(error) {
      res.status(422).json(error);
    });
	} else {
		return res.json({ user: null, browser: null })
	}
});

router.post(
	'/login',
	function(req, res, next) {
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
    const user = JSON.parse(JSON.stringify(req.user)) // hack
    const browser = JSON.parse(JSON.stringify(req.user.browser));
    const cleanUser = Object.assign({}, user);
    const cleanBrowser = Object.assign({}, browser);
		if (cleanUser.local) {
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser, browser: cleanBrowser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { email, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.email': email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the email: ${email}`
			})
		}
		const newUser = new User({
			'local.email': email,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

module.exports = router
