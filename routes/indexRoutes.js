import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res)=>{
    res.redirect("/graphql")
})

export default apiRouter;