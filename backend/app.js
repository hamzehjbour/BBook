const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const globalErrorHandler = require("./controllers/errorController");
const appointmentsRouter = require("./routes/appointmentsRoutes");
const authRouter = require("./routes/authRoutes");
const servicesRouter = require("./routes/servicesRoutes");
const usersRouter = require("./routes/usersRoutes");
const AppError = require("./utils/AppError");

const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://172.18.0.4:5173/",
  "http://localhost:5173/",
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Implementing CORS

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/appointments", appointmentsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
