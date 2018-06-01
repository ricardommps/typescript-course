"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
describe('Testes de Integração', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    var model = require('../../server/models');
    var id;
    var token;
    var userTest = {
        id: 2,
        name: 'Usuario Teste',
        email: 'teste@gmail.com',
        password: 'teste'
    };
    var userDefault = {
        id: 1,
        name: 'Ricardo',
        email: 'ricardo@gmail.com',
        password: '123456'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {} // Remove todos registros do banco
        })
            .then(function () {
            return model.User.create(userDefault);
        })
            .then(function (user) {
            model.User.create(userTest)
                .then(function () {
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
        });
    });
    describe('POST /token', function () {
        it('Deve receber um JWT', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + token);
                done(error);
            });
        });
        it('Nao deve gerar Token', function (done) {
            var credentials = {
                email: 'emmailerrado@teste.com',
                password: 'errado'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    // describe('GET /api/users/all', () => {
    //   it('Deve retornar um Array com todos os Usuários', done => {
    //       request(app)
    //         .get('/api/users/all')
    //         .end((error, res) => {
    //            expect(res.status).to.equal(HTTPStatus.OK);
    //            expect(res.body.payload).to.be.an('array');
    //            expect(res.body.payload[0].name).to.be.equal(userDefault.name);
    //            expect(res.body.payload[0].email).to.be.equal(userDefault.email);
    //            done(error);
    //         })
    //   })
    // });
    // describe('GET /api/users/:id', () => {
    //   it('Deve retornar um Array com apenas um Usuários', done => {
    //       request(app)
    //           .get(`/api/users/${userDefault.id}`)
    //       .end((error, res) => {
    //           expect(res.status).to.equal(HTTPStatus.OK);
    //           expect(res.body.payload.id).to.be.equal(userDefault.id);
    //           expect(res.body.payload).to.have.all.keys([
    //               'id', 'name', 'email', 'password'
    //           ]);
    //           done(error);
    //       })
    //   })
    // });
    // describe('POST /api/users/create', () => {
    //   it('Deve criar um novo Usuários', done => {
    //       const user = {
    //           id:3,
    //           name: 'Usuario Teste',
    //           email: 'usuario@email.com',
    //           password: 'novouser'
    //
    //     }
    //     request(app)
    //       .post('/api/users/create')
    //       .send(user)
    //       .end((error, res) => {
    //           expect(res.status).to.equal(HTTPStatus.OK);
    //           expect(res.body.payload.id).to.eql(user.id);
    //           expect(res.body.payload.name).to.eql(user.name);
    //           expect(res.body.payload.email).to.eql(user.email);
    //           done(error);
    //       })
    //   })
    // });
    // describe('PUT /api/users/:id/update', () => {
    //   it('Deve atualizar um Usuários', done => {
    //     const user = {
    //       name: 'TesteUpdate',
    //       email: 'update@email.com'
    //     }
    //       request(app)
    //           .put(`/api/users/${userTest.id}/update`)
    //           .send(user)
    //           .end((error, res) => {
    //             expect(res.status).to.equal(HTTPStatus.OK);
    //             expect(res.body.payload[0]).to.eql(1);
    //             done(error);
    //           })
    //   })
    // });
    // describe('DELETE /api/users/:id/destroy', () => {
    //   it('Deve remover um Usuários', done => {
    //     request(app)
    //           .del(`/api/users/${userTest.id}/destroy`)
    //           .end((error, res) => {
    //             expect(res.status).to.equal(HTTPStatus.OK);
    //             expect(res.body.payload).to.eql(1)
    //             done(error);
    //           })
    //   })
    // })
});
