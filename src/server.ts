import dotenv from "dotenv";

import app from "./app/index";

dotenv.config();

const PORT = process.env.PORT || 1339;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => console.log(`Listening @ ${HOST}:${PORT}`));
