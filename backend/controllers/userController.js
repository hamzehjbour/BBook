const prisma = require("../prisma/client");

exports.getUsers = async (req, res, next) => {
  try {
    const { role, includeDeleted } = req.query;

    const filters = {};

    if (role) {
      filters.role = role;
    }

    if (includeDeleted) {
      filters.isDeleted = undefined;
    } else if (!includeDeleted) {
      filters.isDeleted = false;
    }

    const users = await prisma.users.findMany({
      where: filters,
      omit: {
        password: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params);
    await prisma.users.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    return next(err);
  }
};
