const validUser = {
  email: process.env.Email,
  password: process.env.PASSWORD,
};

const invalidUser = {
  email: process.env.Invalid_EMAIL,
  password: process.env.Invalid_PASSWORD,
};

module.exports = { validUser, invalidUser };