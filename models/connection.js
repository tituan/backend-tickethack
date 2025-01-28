const mongoose = require("mongoose");
const connectionString =
    "mongodb+srv://admin:UkGlr5CjhRakrSSl@cluster0.cr9tp.mongodb.net/tickethack";

mongoose
    .connect(connectionString, { connectTimeoutMS: 2000 })

    .then(() => console.log("Database connected"))
    .catch((error) => console.error("error"));
