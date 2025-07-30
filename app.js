require('dotenv').config(); // Load .env variables
const express = require('express');
const PORT = process.env.PORT || 3000;
const { ErrorMiddleware } = require("./middleware/error");
const cors = require("cors");
const db = require('./models');
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
// app.use('/api/v1', userRoutes);


// 4. Test route
app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "API is working",
    });
});

// 5. Catch-all for unknown routes
app.all(/(.*)/, (req, res, next) => {
    const err = new Error(`Route  not found`);
    err.statusCode = 404;
    next(err);
});


app.use(ErrorMiddleware);

// DB Connection & Server Start
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection established');

    await db.sequelize.sync({ force: false }); // Use force: true to drop & recreate tables on startup
    console.log('🗃️ Models synced with database');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to start app:', err);
  }
})();
