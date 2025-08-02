const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const commonPassword = "pass1234";
  const hashedPassword = await bcrypt.hash(commonPassword, 12);

  const adminUser = await prisma.users.upsert({
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

  const receptionistUser = await prisma.users.upsert({
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

  const staffUsersData = [
    { email: "staff1@example.com", name: "Alice Staff" },
    { email: "staff2@example.com", name: "Bob Staff" },
    { email: "staff3@example.com", name: "Charlie Staff" },
  ];

  const staffUsers = [];
  for (const staff of staffUsersData) {
    const createdStaff = await prisma.users.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        email: staff.email,
        name: staff.name,
        password: hashedPassword,
        role: "staff",
      },
    });
    staffUsers.push(createdStaff);
    console.log(`Created staff user: ${createdStaff.email}`);
  }

  const serviceHaircut = await prisma.services.upsert({
    where: { name: "Haircut" },
    update: {},
    create: {
      name: "Haircut",
      price: 50,
      category: "Hair",
    },
  });
  console.log(`Created service: ${serviceHaircut.name}`);

  const serviceManicure = await prisma.services.upsert({
    where: { name: "Manicure" },
    update: {},
    create: {
      name: "Manicure",
      price: 30,
      category: "Nails",
    },
  });
  console.log(`Created service: ${serviceManicure.name}`);

  const serviceMassage = await prisma.services.upsert({
    where: { name: "Massage" },
    update: {},
    create: {
      name: "Massage",
      price: 80,
      category: "Spa",
    },
  });
  console.log(`Created service: ${serviceMassage.name}`);

  const now = new Date();

  const appt1Date = new Date(now);
  appt1Date.setDate(now.getDate() + 1);
  appt1Date.setHours(10, 0, 0, 0);

  await prisma.appointments.upsert({
    where: { id: 1 },
    update: {},
    create: {
      serviceId: serviceHaircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client A",
      appointmentUTC: appt1Date,
      status: "PENDING",
    },
  });
  console.log("Created Appointment 1");

  const appt2Date = new Date(now);
  appt2Date.setDate(now.getDate() + 1);
  appt2Date.setHours(11, 30, 0, 0);

  await prisma.appointments.upsert({
    where: { id: 2 },
    update: {},
    create: {
      serviceId: serviceManicure.id,
      staffId: staffUsers[1].id,
      clientName: "Client B",
      appointmentUTC: appt2Date,
      status: "CONFIRMED",
    },
  });
  console.log("Created Appointment 2");

  const appt3Date = new Date(now);
  appt3Date.setHours(9, 0, 0, 0);

  await prisma.appointments.upsert({
    where: { id: 3 },
    update: {},
    create: {
      serviceId: serviceMassage.id,
      staffId: staffUsers[2].id, // Charlie Staff
      clientName: "Client C",
      appointmentUTC: appt3Date,
      status: "COMPLETED",
    },
  });
  console.log("Created Appointment 3");

  const appt4Date = new Date(now);
  appt4Date.setDate(now.getDate() + 2); // Day after tomorrow
  appt4Date.setHours(14, 0, 0, 0); // 02:00 PM

  await prisma.appointments.upsert({
    where: { id: 4 },
    update: {},
    create: {
      serviceId: serviceHaircut.id,
      staffId: staffUsers[0].id,
      clientName: "Client D",
      appointmentUTC: appt4Date,
      status: "CANCELLED",
    },
  });
  console.log("Created Appointment 4");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
