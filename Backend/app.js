import express from "express";
import "dotenv/config"
import { connect } from "mongoose";
import authRoutes from "./router/userRoutes.js";
import recipeRoutes from "./router/receipeRouter.js";
import cors from "cors"

const app = express();

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get('/about', (req,res) => {
    res.json({msg:"About Page"})
})

//middlewares
app.use(express.json())

// Step 1: Configure CORS options (optional)
const corsOptions = {
    origin: 'https://dynamic-bavarois-fe09d0.netlify.app', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
};
  
// Step 2: Apply CORS middleware
app.use(cors(corsOptions));

//routes
app.use('/api', authRoutes)
app.use('/api/recipes',recipeRoutes)


const PORT=process.env.PORT
app.listen(PORT,async () => {
    await connect(process.env.DB_URL);
    console.log("Database is connected");
    console.log(`Server is running on http://localhost:${PORT}`);
});