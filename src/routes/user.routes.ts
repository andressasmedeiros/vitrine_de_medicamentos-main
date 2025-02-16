import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import authenticate from "../middlewares/authenticate";

const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

userRouter.post("/", authenticate(["criar_usuario"]), async (req, res) => {
  try {

    const userBody = req.body;

    if (
      !userBody ||
      !userBody.nome ||
      !userBody.email ||
      !userBody.senha) {
      res.status(400).json("Campos obrigatórios não preenchidos.");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    let senhaCriptografada = await bcrypt.hash(userBody.senha, salt);

    userBody.senha = senhaCriptografada;

    await userRepository.save(userBody);
    res.status(201).json(userBody);
    return

  } catch (error) {
    res.status(500).json("Não foi possível executar a solicitação.");
  }
});

userRouter.get("/", authenticate(["listar_usuario"]), async (req, res) => {
  try {
    const result = await userRepository.find();

    res.status(200).json(result);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação.");
  }
});

export default userRouter;