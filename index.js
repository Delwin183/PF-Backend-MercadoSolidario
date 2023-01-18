require("dotenv").config();
const app = require("./src/app");
const { PORT } = process.env;

// const userRouter = require('./src/routes/index')
// app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
