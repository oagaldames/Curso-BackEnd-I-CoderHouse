import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api",routes);

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})

