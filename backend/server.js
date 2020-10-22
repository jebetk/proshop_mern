import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

//Connect Database
connectDB();

const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
