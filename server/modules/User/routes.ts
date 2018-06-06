import { Request, Response } from 'express';
import UserControlelr from './controller';
class UserRoutes {

    constructor(){}

    index(req: Request, res: Response){
      return UserControlelr.getAll(req,res);
    }

    create(req: Request, res: Response){
      return UserControlelr.createUser(req, res);
    }

    findOne(req: Request, res: Response){
      console.log(">>>>findOne")
      return UserControlelr.getById(req, res);
    }

    update(req: Request, res: Response){
      return UserControlelr.updateUser(req, res);
    }

    destroy(req: Request, res: Response){
      return UserControlelr.deleteUser(req, res);
    }
}

export default new UserRoutes();
