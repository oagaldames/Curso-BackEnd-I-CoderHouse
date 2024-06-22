import mongosse from "mongoose";
export const connectMongoDB = async () => {
    try {
        //aqui poner la conexion que se envio por mensaje
        mongosse.connect("")
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(error);
    }
}