import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status'
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import User from './service';

class UserController{

    constructor() {}

  getAll(req: Request, res: Response) {
    User.getAll()
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuarios'))
  }

  createUser(req: Request, res: Response){
    User.create(req.body)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, 'Erro ao inserir novo usuarios'))
  }

  getById(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    User.getById(userId)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Usuario nao encontrado'))
  }

  updateUser(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    const props = req.body;
    User.update(userId, props)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuarios'))
  }

  deleteUser(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    User.delete(userId)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuarios'))
  }
}

export default new UserController();
