const zod = require("zod");
const prisma = require("../prisma/client");

exports.getAppointments = async (req, res, next) => {
  try {
    const {
      staffId,
      status,
      startDate,
      endDate,
      includeDeleted,
      page = 1,
      limit = 10,
    } = req.query;
    const filters = {};

    if (req.user.role === "staff") {
      filters.staffId = Number(req.user.id);
    }

    if (staffId) {
      filters.staffId = Number(staffId);
    }

    if (status) {
      filters.status = status.toUpperCase();
    }

    if (startDate || endDate) {
      filters.appointmentUTC = {};
      if (startDate) {
        filters.appointmentUTC.gte = new Date(startDate);
      }
      if (endDate) {
        filters.appointmentUTC.lte = new Date(
          new Date(endDate).setHours(23, 59, 59, 999),
        );
      }
    }

    if (includeDeleted) {
      filters.isDeleted = undefined;
    } else if (!includeDeleted) {
      filters.isDeleted = false;
    }

    //PAGINATION
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const appointments = await prisma.appointments.findMany({
      where: filters,
      include: {
        staff: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
      take,
      skip,
    });

    const totalRows = await prisma.appointments.count({ where: filters });

    res.status(200).json({
      status: "sucess",
      result: appointments.length,
      page: Number(page),
      totalPages: Math.ceil(totalRows / take),
      data: appointments,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const appointmentZodSchema = zod.object({
      serviceId: zod.int(),
      staffId: zod.int(),
      clientName: zod.string(),
      appointmentUTC: zod.string().datetime(),
      status: zod.string(),
    });

    const appointmentData = appointmentZodSchema.parse(req.body);
    appointmentData.status = appointmentData.status.toUpperCase();
    const appointment = await prisma.appointments.create({
      data: appointmentData,
    });

    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (err) {
    return err instanceof zod.ZodError ? next(err.issues) : next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateAppointmentZodSchema = zod.object({
      serviceId: zod.int().optional(),
      staffId: zod.int().optional(),
      clientName: zod.string().optional(),
      appointmentUTC: zod.string().datetime().optional(),
      status: zod.string().optional(),
      isDeleted: zod.boolean().optional(),
    });

    const newData = updateAppointmentZodSchema.parse(req.body);

    const updatedAppointment = await prisma.appointments.update({
      where: {
        id: Number(id),
      },
      data: newData,
    });

    res.status(200).json({
      stauts: "success",
      data: updatedAppointment,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    await prisma.appointments.update({
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
