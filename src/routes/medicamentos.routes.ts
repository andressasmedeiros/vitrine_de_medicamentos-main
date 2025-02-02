import { AppDataSource } from "../database/data-source";
import { Request, Response, Router } from "express";
import { Medicamento } from "../entity/Medicamento";
import { Like } from "typeorm";

const medicamentosRouter = Router();
const medicamentoRepository = AppDataSource.getRepository(Medicamento);

medicamentosRouter.post("/", async (req: Request, res: Response) => {
  try {
    const medBody = req.body as Medicamento;

    if (
      !medBody ||
      !medBody.nome ||
      !medBody.quantidade ||
      !medBody.userId ||
      !medBody.descricao
    ) {
      res.status(400).json("Preencha todos os dados!");
      return;
    }

    await medicamentoRepository.save(medBody);

    res.status(201).json(medBody);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

medicamentosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.headers.userid);

    if (!userId) {
      res.status(400).json("Será necessário informar o userId no header");
      return;
    }

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const nome = req.query.nome ? String(req.query.nome) : null;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const whereClause: any = { userId };

    if (nome) {
      whereClause.nome = `%${nome}%`;
    }

    const result = await medicamentoRepository.find({
      where: nome
        ? { userId, nome: Like(`%${nome}%`) }
        : { userId },
      skip,
      take: limit,
    });

    if (!result.length) {
      res.status(200).json("Nenhum medicamento encontrado!");
      return;
    }

    res.status(200).json(result);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

medicamentosRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await medicamentoRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!result) {
      res.status(200).json("Nenhum medicamento encontrado!");
      return;
    }

    res.status(200).json(result);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

medicamentosRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const nome = req.query.nome ? String(req.query.nome) : null;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const whereClause: any = {};

    if (nome) {
      whereClause.nome = Like(`%${nome}%`);
    }

    const result = await medicamentoRepository.find({
      where: nome ? { nome: Like(`%${nome}%`) } : {},
      skip,
      take: limit,
    });

    if (!result.length) {
      res.status(200).json("Nenhum medicamento encontrado!");
      return;
    }

    res.status(200).json(result);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

medicamentosRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userId = Number(req.headers.userid);

    if (!userId) {
      res.status(400).json("Será necessário informar o userId no header");
      return;
    }

    const medBody = req.body as Medicamento;

    const medicamento = await medicamentoRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!medicamento) {
      res.status(200).json("Nenhum medicamento encontrado!");
      return;
    }

    Object.assign(medicamento, medBody);

    await medicamentoRepository.save(medicamento);

    res.status(200).json(medicamento);
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

medicamentosRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userId = Number(req.headers.userid);

    if (!userId) {
      res.status(400).json("Será necessário informar o userId no header");
      return;
    }

    const medicamento = await medicamentoRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!medicamento) {
      res.status(200).json("Nenhum medicamento encontrado!");
      return;
    }

    await medicamentoRepository.remove(medicamento);

    res.status(200).json("Medicamento removido com sucesso!");
  } catch (ex) {
    res.status(500).json("Não foi possível executar a solicitação!");
  }
});

export default medicamentosRouter;
