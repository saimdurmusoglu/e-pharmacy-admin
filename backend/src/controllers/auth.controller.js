const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// POST /api/user/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', user ? 'yes' : 'no');
    console.log('Email searched:', email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/user/logout
const logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// GET /api/user/user-info
const getUserInfo = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, logout, getUserInfo };