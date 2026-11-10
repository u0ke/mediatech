
import { Router } from "express";

const router = Router();

let livres = [
    { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
    { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
    { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];

// book get
router.get("/", (req, res) => res.json(livres));

// book get
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(livre);
});

// books/livres--------------

// book post
router.post("/", (req, res) => {
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
router.patch("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = livres.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    livres.splice(index, 1);

    res.status(204).end();
});

export default router;
