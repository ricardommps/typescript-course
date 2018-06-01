import { Request, Response } from 'express';
import UserControlelr from './controller';
let UserCtrl;
class UserRoutes {

    constructor(){
      UserCtrl = new UserControlelr();
    }

    index(req: Request, res: Response){
      return UserCtrl.getAll(req,res);
    }

    create(req: Request, res: Response){
      return UserCtrl.createUser(req, res);
    }

    findOne(req: Request, res: Response){
      console.log(">>>>findOne")
      return UserCtrl.getById(req, res);
    }

    update(req: Request, res: Response){
      return UserCtrl.updateUser(req, res);
    }

    destroy(req: Request, res: Response){
      return UserCtrl.deleteUser(req, res);
    }
}

export default UserRoutes;
