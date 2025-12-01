
import express from "express"
import router from "./app/routes"
import cookieParser from "cookie-parser";
const app = express()


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



export default app;