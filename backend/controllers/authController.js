const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const zod = require("zod");
const prisma = require("../prisma/client");
const AppError = require("../utils/AppError");
const { hashPassword, comparePasswords } = require("../utils/hash");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError(
        "Your are not logged in! Please log in to use the application",
        401,
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await prisma.users.findFirst({
      where: {
        id: decoded.id,
      },
      omit: {
        password: true,
      },
    });

    if (!currentUser) {
      throw new AppError("Please login to get access", 401);
    }

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   throw new AppError("User changes his password please log in again", 401);
    // }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(err);
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };

exports.signup = async (req, res, next) => {
  try {
    const signinZodSchema = zod.object({
      name: zod.string(),
      email: zod.string() && zod.z.email(),
      password: zod.string(),
      confirmPassword: zod.string(),
      role: zod.string(),
    });

    const newUserDate = signinZodSchema.parse(req.body);

    if (req.body.password !== req.body.confirmPassword) {
      throw new AppError("Password and confirm password must match", 400);
    }

    newUserDate.confirmPassword = undefined;
    newUserDate.password = await hashPassword(newUserDate.password);

    const newUser = await prisma.users.create({
      data: newUserDate,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully created a new user",
    });
  } catch (err) {
    // console.log(JSON.parse(err.message)[0].message);
    return err instanceof zod.ZodError ? next(err.issues) : next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const loginZodSchema = zod.object({
      email: zod.string() && zod.z.email(),
      password: zod.string(),
    });

    if (!req.body.email || !req.body.password) {
      throw new AppError("Please provide your email and password", 401);
    }

    const userData = loginZodSchema.parse(req.body);

    const user = await prisma.users.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (!(await comparePasswords(userData.password, user.password))) {
      throw new AppError("Incorrect email or password", 401);
    }

    createSendToken(user, 200, res);
  } catch (err) {
    return next(err);
  }
};
