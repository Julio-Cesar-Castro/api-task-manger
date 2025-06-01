import { app } from "./app";
import { routes } from "@/routes/index"
import { errorHandling } from "./middlewares/errorHandling";

const PORT = 3333

app.use(routes)

app.use(errorHandling)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))