import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
// import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", status: "OK" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/clinical-services", clinicRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
