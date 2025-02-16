import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import PayloadJwt from "../classes/PayloadJwt";

const authRouter = Router();

const userRepository = AppDataSource.getRepository(User);

authRouter.post("/", async (req, res) => {
  try {

    const userBody = req.body;

    if (
      !userBody ||
      !userBody.email ||
      !userBody.senha) {
      res.status(400).json("Campos obrigatórios não preenchidos.");
      return;
    }

    const user = await userRepository.findOne({
      where: {
        email: userBody.email
      },
      relations: ["roles", "roles.permissions"],
      select: {
        roles: {
          id: true,
          description: true,
          permissions: {
            id: true,
            description: true
          }
        }
      }
    });

    if (!user) {
      res.status(401).json("Usuário e/ou senha incorreta..");
      return;
    }

    console.log(userBody.senha, user.senha)

    const valido = await bcrypt.compare(userBody.senha, user.senha);

    if (valido) {
      const chaveSecretaJwt = process.env.JWT_SECRET ?? ""
      console.log(user.roles)

      const payload = {
        email: user.email,
        nome: user.nome,
        userId: user.id,
        roles: JSON.stringify(user.roles),
      } as PayloadJwt

      const token = await jwt.sign(payload, chaveSecretaJwt, { expiresIn: '1h' })

      res.status(200).json({ token: token })
    } else {
      res.status(401).json("Usuário e/ou senha incorreta.");
      return
    }


  } catch (error) {
    console.error(error)
    res.status(500).json("Não foi possível executar a solicitação.");
  }
});

export default authRouter; 