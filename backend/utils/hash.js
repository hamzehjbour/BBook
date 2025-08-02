const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => await bcrypt.hash(password, 12);

exports.comparePasswords = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);
