const app = require("./app");
const prisma = require("./prisma/client");

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // You can verify DB connection like this (optional)
    await prisma.$connect();
    console.log("🟢 Connected to MySQL database via Prisma");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("🔴 Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
