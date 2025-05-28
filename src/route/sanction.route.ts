import {Router, Request, Response} from "express";
import {
    sanctionGameControl,
    sanctionUserControl,
    freeSanctionGameControl,
    freeSanctionUserControl, getSanctionedGamesControl, getSanctionedUsersControl,
} from "../controller/sanction.controller";

const router = Router();

router.post("/sanction/game", async (req: Request, res: Response) => {
    try {
        await sanctionGameControl(req, res);
        res.status(201).json({message: "Game sanctioned"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


router.post("/sanction/user", async (req: Request, res: Response) => {
    try {
        await sanctionUserControl(req, res);
        res.status(201).json({message: "User sanctioned"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.post("/sanction/free/game", async (req: Request, res: Response) => {
    try {
        await freeSanctionGameControl(req, res);
        res.status(200).json({message: "Game sanction removed"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
router.post("/sanction/free/user", async (req: Request, res: Response) => {
    try {
        await freeSanctionUserControl(req, res);
        res.status(200).json({message: "User sanction removed"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.get("/sanction/gameList", async (req: Request, res: Response) => {
    try {
        const result = await getSanctionedGamesControl(req, res);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sanctioned games" });
    }
})

router.get("/sanction/userList", async (req: Request, res: Response) => {
    try {
        const result = await getSanctionedUsersControl(req, res);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sanctioned games" });
    }
})

export default router;
