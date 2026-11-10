
import { Router } from "express";

const router = Router();

let adherents = [
    { id: 1, nom: "Salma", email: "salma@exemple.ma" },
    { id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];

// members get
router.get("/", (req, res) => {
    res.json(adherents);
});

// Pmembers post
router.post("/", (req, res) => {
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

export default router;
