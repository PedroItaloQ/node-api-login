import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        console.log(name, email, password);

        const userExists = await userRepository.findOneBy({ email });

        if(userExists) {
            throw new BadRequestError("E-mail já criado!");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({ 
            name,
            email,
            password: hashPassword
        });

        await userRepository.save(newUser);

        const { password: _, ...user } = newUser

        return res.status(201).json(user);
    };

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });

        if(!user){
            throw new BadRequestError("E-mail ou senha invalido!");
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if(!verifyPass) {
            throw new BadRequestError("E-mail ou senha invalido!");
        }


    }

};