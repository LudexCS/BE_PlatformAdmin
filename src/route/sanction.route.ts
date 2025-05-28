import { Router, Request, Response } from "express";
import {
    sanctionGame,
    sanctionUser,
    freeSanctionGame,
    freeSanctionUser,
} from "../controller/admin.controller";

const router = Router();

router.post("/sanction/game", sanctionGame);
router.post("/sanction/user", sanctionUser);
router.post("/sanction/free/game", freeSanctionGame);
router.post("/sanction/free/user", freeSanctionUser);

export default router;
