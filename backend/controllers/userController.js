const prisma = require("../prisma/client");

exports.getUsers = async (req, res, next) => {
  try {
    const { role, includeDeleted, name, page = 1, limit = 10 } = req.query;

    const filters = {};

    if (name) {
      filters.name = { contains: name };
    }

    if (role) {
      filters.role = role;
    }

    if (includeDeleted) {
      filters.isDeleted = undefined;
    } else if (!includeDeleted) {
      filters.isDeleted = false;
    }

    //PAGINATION

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const users = await prisma.users.findMany({
      where: filters,
      omit: {
        password: true,
      },

      take,
      skip,
    });

    const totalRows = await prisma.users.count({ where: filters });

    res.status(200).json({
      status: "success",
      result: totalRows,
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
