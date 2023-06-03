import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as express from "express";
import { asyncSignToken } from "../common/asyncJWT";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async createUser(
    @Body("email") email: string,
    @Body("password") password: string
  ): Promise<{ message: string; id?: number }> {
    const id = await this.usersService.createNew({ email, password });
    return { message: "ok", id };
  }

  @Post("login")
  async login(
    @Res() res: express.Response,
    @Body("email") email: string,
    @Body("password") password: string
  ): Promise<void> {
    const id: number = <number>await this.usersService.checkAuth({ email, password });
    const token = await asyncSignToken(id);
    res.cookie("token", token);
    res.json({ message: "successfully logged in" });
  }

  @Get("logout")
  logout(@Res() res: express.Response): void {
    res.clearCookie("token");
    res.json({ message: "successfully logged out" });
  }
}
