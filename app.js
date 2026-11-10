
import express from "express";
import livresRouter from "./routes/livres.js";
import adherentsRouter from "./routes/adherents.js";
import empruntsRouter from "./routes/emprunts.js";

const app = express();
app.use(express.json());

app.use("/livres", livresRouter);
app.use("/adherents", adherentsRouter);
app.use("/emprunts", empruntsRouter);

app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
