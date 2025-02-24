import mongoose from "mongoose";

export const db_Connection = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err, "Database connection failed");
    });
};
