require('dotenv').config()
const app = require('./src/app');

// const userRouter = require('./src/routes/index')
// app.use('/api', userRouter)

app.listen(3001, () => {
    console.log('Server is running on port 3001')
});
