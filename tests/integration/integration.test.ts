import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;
    let token;

    const userTest = {
        id: 2,
        name: 'Usuario Teste',
        email: 'teste@gmail.com',
        password: 'teste'
    };

    const userDefault = {
        id: 1,
        name: 'Ricardo',
        email: 'ricardo@gmail.com',
        password: '123456'
    };

    beforeEach((done) => {
        model.User.destroy({
            where: {}       // Remove todos registros do banco
        })
          .then(() => {
             return model.User.create(userDefault);
           })
          .then(user => {
              model.User.create(userTest)
                  .then(() => {
                      token = jwt.encode({ id: user.id }, config.secret);
                      console.log(">>>> TOKEN", token)
                    done();
                  })
          })
    })

    describe('POST /token', () => {
     it('Deve receber um JWT', done => {
       const credentials = {
         email: userDefault.email,
         password: userDefault.password
       };
       request(app)
         .post('/token')
         .send(credentials)
         .end((error, res) => {
           expect(res.status).to.equal(HTTPStatus.OK);
           expect(res.body.token).to.equal(`${token}`);
           done(error);
         });
     });

    it('Nao deve gerar Token', done =>{
      const credentials = {
        email: 'emmailerrado@teste.com',
        password: 'errado'
      };
      request(app)
        .post('/token')
        .send(credentials)
        .end((error,res) => {
          expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
          expect(res.body).to.empty;
          done(error);
        });
    })
  })

    describe('GET /api/users/all', () => {
        it('Deve retornar um Array com todos os Usuários', done => {
            console.log(">>>> TOKEN all", token)
         request(app)
             .get('/api/users/all')
             .set('Content-Type', 'application/json')
             .set('Authorization', `JWT ${token}`)
             .end((error, res) => {
                  expect(res.status).to.equal(HTTPStatus.OK);
                  expect(res.body.payload).to.be.an('array');
                  expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                  expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                  done(error);
           })
     })
   });
   describe('GET /api/users/:id', () => {
       it('Deve retornar um Array com apenas um Usuários', done => {
           console.log(">>>> TOKEN users id", token)
         request(app)
             .get(`/api/users/${userDefault.id}`)
             .set('Content-Type', 'application/json')
             .set('Authorization', `JWT ${token}`)
         .end((error, res) => {
             expect(res.status).to.equal(HTTPStatus.OK);
             expect(res.body.payload.id).to.be.equal(userDefault.id);
             expect(res.body.payload).to.have.all.keys([
                 'id', 'name', 'email', 'password'
             ]);
             done(error);
         })
     })
   });
   describe('POST /api/users/create', () => {
     it('Deve criar um novo Usuários', done => {
         const user = {
             id:3,
             name: 'Usuario Teste',
             email: 'usuario@email.com',
             password: 'novouser'
  
         }
         console.log(">>>> TOKEN create", token)
       request(app)
           .post('/api/users/create')
           .set('Content-Type', 'application/json')
           .set('Authorization', `JWT ${token}`)
         .send(user)
         .end((error, res) => {
             expect(res.status).to.equal(HTTPStatus.OK);
             expect(res.body.payload.id).to.eql(user.id);
             expect(res.body.payload.name).to.eql(user.name);
             expect(res.body.payload.email).to.eql(user.email);
             done(error);
         })
     })
   });
   describe('PUT /api/users/:id/update', () => {
     it('Deve atualizar um Usuários', done => {
       const user = {
         name: 'TesteUpdate',
         email: 'update@email.com'
         }
         console.log(">>>> TOKEN update", token)
         request(app)
             .put(`/api/users/${userTest.id}/update`)
             .set('Content-Type', 'application/json')
             .set('Authorization', `JWT ${token}`)
             .send(user)
             .end((error, res) => {
               expect(res.status).to.equal(HTTPStatus.OK);
               expect(res.body.payload[0]).to.eql(1);
               done(error);
             })
     })
   });
   describe('DELETE /api/users/:id/destroy', () => {
       it('Deve remover um Usuários', done => {
           console.log(">>>> TOKEN destroy", token)
       request(app)
           .del(`/api/users/${userTest.id}/destroy`)
           .set('Content-Type', 'application/json')
           .set('Authorization', `JWT ${token}`)
             .end((error, res) => {
               expect(res.status).to.equal(HTTPStatus.OK);
               expect(res.body.payload).to.eql(1)
               done(error);
             })
     })
   })
})
