const zod = require("zod");
const prisma = require("../prisma/client");

exports.getServices = async (req, res, next) => {
  try {
    const {
      minPrice,
      maxPrice,
      category,
      sort = "price",
      page = 1,
      limit = 10,
      includeDeleted,
    } = req.query;

    // FILTERING
    const filters = {};

    if (minPrice || maxPrice) {
      filters.price = {};

      if (maxPrice) filters.price.lte = Number(maxPrice);
      if (minPrice) filters.price.gte = Number(minPrice);
    }

    if (category) filters.category = category;

    if (includeDeleted) {
      filters.isDeleted = undefined;
    } else if (!includeDeleted) {
      filters.isDeleted = false;
    }

    // SORTING
    const orderBy = {};
    const isDescending = sort.startsWith("-");
    const sortField = isDescending ? sort.slice(1) : sort;
    orderBy[sortField] = isDescending ? "desc" : "asc";

    //PAGINATION
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const services = await prisma.services.findMany({
      where: filters,
      orderBy,
      take,
      skip,
    });

    const totalRows = await prisma.services.count({ where: filters });

    res.status(200).json({
      status: "success",
      result: services.length,
      page: Number(page),
      totalPages: Math.ceil(totalRows / take),
      data: {
        services,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const serviceZodSchema = zod.object({
      name: zod.string(),
      price: zod.int(),
      category: zod.string(),
    });

    const newData = serviceZodSchema.parse(req.body);

    const newService = await prisma.services.create({
      data: newData,
    });

    res.status(201).json({
      status: "success",
      data: {
        newService,
      },
    });
  } catch (err) {
    return err instanceof zod.ZodError ? next(err.issues) : next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const updateServiceZodSchema = zod.object({
      name: zod.string().optional(),
      category: zod.string().optional(),
      price: zod.int().optional(),
    });

    const updatedData = updateServiceZodSchema.parse(req.body);

    const updatedService = await prisma.services.update({
      where: {
        id: +req.params.id,
      },
      data: updatedData,
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedService,
      },
    });
  } catch (err) {
    return err instanceof zod.ZodError ? next(err.issues) : next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await prisma.services.update({
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
