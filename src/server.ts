import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("connected to DB!");
        server = app.listen(envVars.PORT, () => {
            console.log(`server is running on port ${envVars.PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}

(async () => {
    await startServer()
    await seedSuperAdmin()
})()

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received.... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandle Rejection Detected ... Server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})


process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Detected ... Server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})