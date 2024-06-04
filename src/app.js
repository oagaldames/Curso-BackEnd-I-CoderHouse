import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 
app.use(express.static("public"));

//  Rutas 
//rutas de la Api
app.use("/api",routes);
// Rutas de las vistas
app.use("/", viewsRoutes);

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
})

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Usuario conectado");
});



