import Express, { Request, Response } from "express"
import { PORT } from "./utils/secret";
import rootRouter from "./router/rootRouter";

const app = Express();
app.use(Express.json())

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "Working" })
})

app.use("/api", rootRouter)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})