import { NextFunction, Request, Response } from "express";
import { asyncVerifyToken } from "./asyncJWT";

export function checkAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!req.cookies.token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  asyncVerifyToken(req.cookies.token)
    .then((id) => {
      req.body.userId = id;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.clearCookie("token");
      res.status(401).json({ error: "Invalid auth token", statusCode: 401 });
    });
}
