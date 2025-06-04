import { Request, Response, Router} from "express";
import {getUserListControl} from "../controller/searchUser.controller";

const router: Router = Router();

router.get("/userList", async (req: Request, res: Response) => {
    try{
        await getUserListControl(req, res);
    } catch(err){
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
});

router.get("/searchNickname", async (req: Request, res: Response) => {
    try{
        await getUserDataControl(req, res);
    } catch(err){
        if (err instanceof Error) {
            res.status(400).json({message: err.message});
        } else {
            res.status(400).json({message: "Unknown error"});
        }
    }
})