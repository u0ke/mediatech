// hada drt gha get
import { Router } from "express";

const router = Router();

let emprunts = [];

// get loans
router.get("/", (req, res) => {
    res.json(emprunts);
});

export default router;
