import { Router } from "express";
import { createUser, login } from "../controller/authController";

const Userrouter = Router();

Userrouter.post("/create", createUser);
Userrouter.get("/login", login);

export default Userrouter;
