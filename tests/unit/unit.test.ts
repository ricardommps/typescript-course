import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';
import { describe } from 'mocha';

const  model = require('../../server/models');

describe('Testes Unitarios do Service', () => {

  const defaultUser = {
      id: 1,
      name: 'Default User',
      email: 'defaultUser@gmail.com',
      password: '1234'
  };

  beforeEach((done) => {
    model.User.destroy({
      where: {}
    })
    .then(() => {
      model.User.create(defaultUser).then(() => {
        console.log('Default User created');
        done();
      });
    });
  });

  describe('Metodo Create', () => {
     it('Deve criar um novo Usuario', () => {
         const novoUsuario = {
             id: 2,
             name: 'Novo Usuario Teste',
             email: 'novousuario@gmail.com',
             password: '1234'
         };
         return User.create(novoUsuario)
             .then(data => {
                 expect(data.dataValues).to.have.all.keys(
                     ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                 )
             })
     });
  });

  describe('Metodo GET Users', () => {
      it('Deve retornar uma lista com todos os Usuarios', () => {
          return User.getAll().then(data => {
              expect(data).to.be.an('array');
          })
      });
  });

  describe('Metodo Update', () => {
     it('Deve atualizar um Usuario', () => {
         const usuarioAtualizado = {
             name: 'Nome atualizado',
             email: 'atualizado@gmail.com'
         };
         return User.update(defaultUser.id, usuarioAtualizado).then(data => {
             expect(data[0]).to.be.equal(1);
         })
     });
  });

  describe('Metodo Delete', () => {
     it('Deve deletar um Usuario', () => {
         return User.delete(defaultUser.id).then(data => {
             expect(data).to.be.equal(1);
         })
     });
  });

  describe('Metodo getById', () => {
      it('Retornar um usuurio de acordo com o ID passado', () => {
          return User.getById(defaultUser.id).then(data => {
              expect(data).to.have.all.keys(
                  ['email', 'id', 'name', 'password']
              )
          })
      })
  })

  describe('Metodo getByEmail', () => {
      it('Retornar um usuurio de acordo com o EMAIL passado', () => {
          return User.getByEmail(defaultUser.email).then(data => {
              expect(data).to.have.all.keys(
                  ['email', 'id', 'name', 'password']
              )
          })
      })
  })

});
