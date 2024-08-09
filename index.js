const express = require("express");
const mongoose = require("mongoose");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const productRoutes = require("./routes//productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const setmedications = require("./routes/scheduleRoutes");
const testBookingRoutes = require("./routes/testBookingRoutes");
const cron = require('node-cron');
const { sendMedicationReminders } = require("./controllers/scheduleController");

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.MGDB_CONT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb started");
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });

app.listen(PORT, () => {
  console.log("Your server running on http://localhost:" + PORT);
});

app.use("/user", userRouter);
app.use("/category",categoryRoutes);
app.use("/subcategory",subcategoryRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);
app.use('/order', orderRoutes);

// app.use("/medicines", medicineRoutes);
// app.use("/prescriptions", prescriptionRoutes);
app.use("/schedules", setmedications);
// app.use("/testBookings", testBookingRoutes);


cron.schedule('*/1 * * * *', async () => {
  console.log('running every minute 1, 2, 4 and 5');
  await sendMedicationReminders();
});

// cron.schedule('0 */3-4 * * *', async () => {
//   console.log('Running every 3 to 4 hours');
//   await sendMedicationReminders();
// });