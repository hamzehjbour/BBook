const zod = require("zod");
const PDFDocument = require("pdfkit");
const prisma = require("../prisma/client");

exports.getAppointments = async (req, res, next) => {
  try {
    const {
      staffId,
      status,
      startDate,
      endDate,
      includeDeleted,
      sort = "-appointmentUTC",
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

    // SORTING
    const orderBy = {};
    const isDescending = sort.startsWith("-");
    const sortField = isDescending ? sort.slice(1) : sort;
    orderBy[sortField] = isDescending ? "desc" : "asc";

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
      orderBy,
      take,
      skip,
    });

    const totalRows = await prisma.appointments.count({ where: filters });

    res.status(200).json({
      status: "sucess",
      result: totalRows,
      page: Number(page),
      totalPages: Math.ceil(totalRows / take),
      data: {
        appointments,
      },
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

    if (newData.status) {
      newData.status = newData.status.toUpperCase();
    }

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

exports.generateReport = async (req, res, next) => {
  const { duration = "monthly" } = req.query;

  const filter = {};

  if (duration === "daily") {
    filter.appointmentUTC = new Date().toISOString();
  }

  if (duration === "weekly") {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    filter.appointmentUTC = {
      gte: oneWeekAgo.toISOString(),
      lte: today.toISOString(),
    };
  }

  if (duration === "monthly") {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    filter.appointmentUTC = {
      gte: oneMonthAgo.toISOString(),
      lte: today.toISOString(),
    };
  }

  try {
    const appointments = await prisma.appointments.findMany({
      where: filter,
      include: {
        staff: {
          select: {
            name: true,
          },
        },
      },
    });

    const staffSummary = await prisma.users.findMany({
      where: {
        role: "staff",
      },

      include: {
        _count: {
          select: {
            staffAppointments: {
              where: filter,
            },
          },
        },
      },

      orderBy: {
        staffAppointments: {
          _count: "desc",
        },
      },
    });

    const doc = new PDFDocument();
    res.set({
      "Content-Disposition": "attachment; filename=report.pdf",
      "Content-type": "application/pdf",
    });

    doc.pipe(res);

    doc.fontSize(20).text("Appointments Report", { align: "center" });
    doc.moveDown();

    // doc.fontSize(14).text(`Report Period: ${period || "Custom"}`);
    doc.fontSize(14).text(`Report Period: Daily`);
    doc.moveDown();

    doc.fontSize(12).text("Appointments:");
    doc.moveDown();

    const appointmentsTableRows = [
      ["Date", "Staff Name", "Client Name", "Status"],
      ...appointments.map((appointment) => [
        appointment.appointmentUTC.toLocaleString("en-UK", {
          timeZone: "Asia/Amman",
          weekday: "short",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        appointment.staff.name,
        appointment.clientName,
        appointment.status,
      ]),
    ];

    doc.table({
      columnStyles: [160, "*", "*", "*"],
      data: appointmentsTableRows,
    });

    doc.moveDown();

    doc.fontSize(12).text("Staff Performance Summary: ");

    const performanceTableRows = [
      ["Staff Name", "Number of Appointments"],
      ...staffSummary.map((summary) => [
        summary.name,
        summary._count.staffAppointments,
      ]),
    ];

    doc.table({
      columnStyles: ["*", "*"],
      data: performanceTableRows,
    });

    doc.end();

    // res.status(200).json({
    //   status: "success",
    // });
  } catch (err) {
    next(err);
  }
};
