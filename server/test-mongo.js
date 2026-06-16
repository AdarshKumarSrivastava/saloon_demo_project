import mongoose from 'mongoose';

const uri = "mongodb+srv://adarshsrivastava536_db_user:KLtNlsZCX1FqGBTL@saloondemo.ahlekan.mongodb.net/MaisonEclat?retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("SUCCESS: Connection established!");
    process.exit(0);
  })
  .catch(err => {
    console.error("ERROR:", err.message);
    process.exit(1);
  });
