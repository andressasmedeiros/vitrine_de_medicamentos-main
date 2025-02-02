import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import bcrypt from "bcrypt";
import { User } from "../entity/User";

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
      }
    });

    if (!user) {
      res.status(401).json("Usuário e/ou senha incorreta..");
      return;
    }

    const valido = await bcrypt.compare(userBody.senha, user.senha);

    if (!valido) {
      res.status(200).json({ userId: user.id });
      return;
    } else {
      res.status(401).json("Usuário e/ou senha incorreta.");
      return
    }


  } catch (error) {
    res.status(500).json("Não foi possível executar a solicitação.");
  }
});

export default authRouter; 