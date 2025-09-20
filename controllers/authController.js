const User = require('../models/User');

module.exports.showRegister = (req, res) => {
  res.render('auth/register');
};

module.exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try{
    const user = new User({ username, password, email, phone });
    await user.save();
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  }catch(e){
    res.render('auth/register', { error: e.message });
  }
};

module.exports.showLogin = (req, res) => {
  res.render('auth/login');
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.render('auth/login', { error: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if(!ok) return res.render('auth/login', { error: 'Invalid credentials' });
  req.session.user = { id: user._id, username: user.username };
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};

module.exports.logout = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  });
};

module.exports.showForgot = (req, res) => {
  res.render('auth/forgot');
};

module.exports.forgot = async (req, res) => {
  // Minimal forgot: find user and show message. Real app should send email.
  const { username } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.render('auth/forgot', { message: 'No account found' });
  // Instruct user to contact admin in this demo.
  res.render('auth/forgot', { message: 'Account exists. Use admin to reset password (demo).' });
};
