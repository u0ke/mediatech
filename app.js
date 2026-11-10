
import express, { Router } from "express";

const app = express();
app.use(express.json());

let livres = [
    { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
    { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
    { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];

let adherents = [
    { id: 1, nom: "Salma", email: "salma@exemple.ma" },
    { id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];

let emprunts = [];

// books/livres--------------

const livresRouter = Router();

// book get
livresRouter.get("/", (req, res) => res.json(livres));

// book get
livresRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(livre);
});

// book post
livresRouter.post("/", (req, res) => {
    const { titre, auteur } = req.body;

    if (!titre || !auteur) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    const nouveauLivre = {
        id: Math.max(0, ...livres.map(l => l.id)) + 1,
        titre: titre,
        auteur: auteur,
        disponible: true
    };

    livres.push(nouveauLivre);

    res.status(201).json(nouveauLivre);
});

// book patch
livresRouter.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    const livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { titre, auteur } = req.body;

    if (titre !== undefined) {
        livre.titre = titre;
    }

    if (auteur !== undefined) {
        livre.auteur = auteur;
    }

    res.json(livre);
});

// book delete
livresRouter.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = livres.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    livres.splice(index, 1);

    res.status(204).end();
});

// members/adhérents-------------------

const adherentsRouter = Router();

// members get
adherentsRouter.get("/", (req, res) => {
    res.json(adherents);
});

// Pmembers post
adherentsRouter.post("/", (req, res) => {
    const { nom, email } = req.body;

    if (!nom || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const nouvelAdherent = {
        id: Math.max(0, ...adherents.map(a => a.id)) + 1,
        nom: nom,
        email: email
    };

    adherents.push(nouvelAdherent);

    res.status(201).json(nouvelAdherent);
});

// loans

const empruntsRouter = Router();

// get loans
empruntsRouter.get("/", (req, res) => {
    res.json(emprunts);
});

app.use("/livres", livresRouter);
app.use("/adherents", adherentsRouter);
app.use("/emprunts", empruntsRouter);

app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
