const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const commonPassword = "pass1234";
  const hashedPassword = await bcrypt.hash(commonPassword, 12);

  // Admin User
  const adminUser = await prisma.Users.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Receptionist
  const receptionistUser = await prisma.Users.upsert({
    where: { email: "receptionist@example.com" },
    update: {},
    create: {
      email: "receptionist@example.com",
      name: "Receptionist User",
      password: hashedPassword,
      role: "receptionist",
    },
  });
  console.log(`Created receptionist user: ${receptionistUser.email}`);

  // Staff
  const staffUsersData = [
    { email: "staff1@example.com", name: "Alice Staff" },
    { email: "staff2@example.com", name: "Bob Staff" },
    { email: "staff3@example.com", name: "Charlie Staff" },
    { email: "staff4@example.com", name: "Diana Staff" },
  ];

  const staffUsers = [];
  for (const staff of staffUsersData) {
    const user = await prisma.Users.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        email: staff.email,
        name: staff.name,
        password: hashedPassword,
        role: "staff",
      },
    });
    staffUsers.push(user);
    console.log(`Created staff user: ${user.email}`);
  }

  // Services
  const haircut = await prisma.Services.upsert({
    where: { name: "Haircut" },
    update: { category: "Hair" },
    create: {
      name: "Haircut",
      price: 50,
      category: "Hair",
    },
  });

  const manicure = await prisma.Services.upsert({
    where: { name: "Manicure" },
    update: { category: "Nails" },
    create: {
      name: "Manicure",
      price: 30,
      category: "Nails",
    },
  });

  const massage = await prisma.Services.upsert({
    where: { name: "Massage" },
    update: { category: "Skin Care" },
    create: {
      name: "Massage",
      price: 80,
      category: "Skin Care",
    },
  });

  const facial = await prisma.Services.upsert({
    where: { name: "Facial Treatment" },
    update: { category: "Skin Care" },
    create: {
      name: "Facial Treatment",
      price: 70,
      category: "Skin Care",
    },
  });

  const makeup = await prisma.Services.upsert({
    where: { name: "Bridal Makeup" },
    update: { category: "Makeup" },
    create: {
      name: "Bridal Makeup",
      price: 120,
      category: "Makeup",
    },
  });

  console.log("Created services.");

  // Appointments
  // Appointments
  const now = new Date();

  const appt1 = await prisma.Appointments.create({
    data: {
      serviceId: haircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client A",
      appointmentUTC: new Date(now.setDate(now.getDate() + 1)),
      status: "PENDING",
    },
  });

  const appt2 = await prisma.Appointments.create({
    data: {
      serviceId: manicure.id,
      staffId: staffUsers[1].id,
      clientName: "Client B",
      appointmentUTC: new Date(new Date().setHours(11, 30, 0, 0)),
      status: "CONFIRMED",
    },
  });

  const appt3 = await prisma.Appointments.create({
    data: {
      serviceId: massage.id,
      staffId: staffUsers[2].id,
      clientName: "Client C",
      appointmentUTC: new Date(new Date().setHours(9, 0, 0, 0)),
      status: "COMPLETED",
    },
  });

  const appt4 = await prisma.Appointments.create({
    data: {
      serviceId: haircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client D",
      appointmentUTC: new Date(new Date().setDate(now.getDate() + 2)),
      status: "CANCELLED",
    },
  });

  const appt5 = await prisma.Appointments.create({
    data: {
      serviceId: facial.id,
      staffId: staffUsers[2].id,
      clientName: "Client E",
      appointmentUTC: new Date(new Date().setHours(14, 0, 0, 0)),
      status: "PENDING",
    },
  });

  const appt6 = await prisma.Appointments.create({
    data: {
      serviceId: makeup.id,
      staffId: staffUsers[3].id,
      clientName: "Client F",
      appointmentUTC: new Date(new Date().setHours(16, 30, 0, 0)),
      status: "CONFIRMED",
    },
  });

  const appt7 = await prisma.Appointments.create({
    data: {
      serviceId: manicure.id,
      staffId: staffUsers[1].id,
      clientName: "Client G",
      appointmentUTC: new Date(new Date().setHours(10, 0, 0, 0)),
      status: "COMPLETED",
    },
  });

  const appt8 = await prisma.Appointments.create({
    data: {
      serviceId: haircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client H",
      appointmentUTC: new Date(new Date().setHours(18, 0, 0, 0)),
      status: "PENDING",
    },
  });

  // Extra appointments to reach 15
  const appt9 = await prisma.Appointments.create({
    data: {
      serviceId: massage.id,
      staffId: staffUsers[2].id,
      clientName: "Client I",
      appointmentUTC: new Date(new Date().setHours(13, 0, 0, 0)),
      status: "CONFIRMED",
    },
  });

  const appt10 = await prisma.Appointments.create({
    data: {
      serviceId: makeup.id,
      staffId: staffUsers[3].id,
      clientName: "Client J",
      appointmentUTC: new Date(new Date().setHours(15, 0, 0, 0)),
      status: "PENDING",
    },
  });

  const appt11 = await prisma.Appointments.create({
    data: {
      serviceId: facial.id,
      staffId: staffUsers[2].id,
      clientName: "Client K",
      appointmentUTC: new Date(new Date().setHours(17, 0, 0, 0)),
      status: "COMPLETED",
    },
  });

  const appt12 = await prisma.Appointments.create({
    data: {
      serviceId: manicure.id,
      staffId: staffUsers[1].id,
      clientName: "Client L",
      appointmentUTC: new Date(new Date().setHours(12, 0, 0, 0)),
      status: "CANCELLED",
    },
  });

  const appt13 = await prisma.Appointments.create({
    data: {
      serviceId: haircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client M",
      appointmentUTC: new Date(new Date().setHours(19, 0, 0, 0)),
      status: "CONFIRMED",
    },
  });

  const appt14 = await prisma.Appointments.create({
    data: {
      serviceId: makeup.id,
      staffId: staffUsers[3].id,
      clientName: "Client N",
      appointmentUTC: new Date(new Date().setHours(20, 0, 0, 0)),
      status: "PENDING",
    },
  });

  const appt15 = await prisma.Appointments.create({
    data: {
      serviceId: facial.id,
      staffId: staffUsers[2].id,
      clientName: "Client O",
      appointmentUTC: new Date(new Date().setHours(21, 0, 0, 0)),
      status: "CONFIRMED",
    },
  });

  console.log("Created 15 appointments.");

  console.log("Created appointments.");
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
