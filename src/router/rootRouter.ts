import { Router, Request, Response } from "express";
import blastEmail from "../actions/blastEmail";
import singleEmail from "../actions/singleEmail";
import eventCertif from "../actions/event/certif";
import tes from "../actions/tes";

const rootRouter: Router = Router();

rootRouter.post("/blast", blastEmail)
rootRouter.post("/single", singleEmail)

// rootRouter.post("/event/sertif", eventCertif);
rootRouter.post("/event/tes", tes);

export default rootRouter;