import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import weather from "../src/routes/weather";
import shelter from "../src/routes/shelter";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/weather", weather);
app.use("/api/shelter", shelter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;
