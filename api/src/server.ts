// Express
import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/database";
import routes from "./routes/Routes";
import * as listEndpoints from "express-list-endpoints";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Initialize
AppDataSource.initialize()
    .then(() => {
        console.log("Database has been initialized!");
    })
    .catch((err) => {
        console.error("Error during database initialization:", err);
    });

// Routes
app.use("/api/test", (req, res) => {
    res.send("Welcome to PizzaOS API");
});
app.use("/api/v1/", routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
