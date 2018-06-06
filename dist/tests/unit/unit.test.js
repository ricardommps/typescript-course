"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var mocha_1 = require("mocha");
var model = require('../../server/models');
mocha_1.describe('Testes Unitarios do Service', function () {
    var defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultUser@gmail.com',
        password: '1234'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            model.User.create(defaultUser).then(function () {
                console.log('Default User created');
                done();
            });
        });
    });
    mocha_1.describe('Metodo Create', function () {
        it('Deve criar um novo Usuario', function () {
            var novoUsuario = {
                id: 2,
                name: 'Novo Usuario Teste',
                email: 'novousuario@gmail.com',
                password: '1234'
            };
            return service_1.default.create(novoUsuario)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    mocha_1.describe('Metodo GET Users', function () {
        it('Deve retornar uma lista com todos os Usuarios', function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    mocha_1.describe('Metodo Update', function () {
        it('Deve atualizar um Usuario', function () {
            var usuarioAtualizado = {
                name: 'Nome atualizado',
                email: 'atualizado@gmail.com'
            };
            return service_1.default.update(defaultUser.id, usuarioAtualizado).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    mocha_1.describe('Metodo Delete', function () {
        it('Deve deletar um Usuario', function () {
            return service_1.default.delete(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
    mocha_1.describe('Metodo getById', function () {
        it('Retornar um usuurio de acordo com o ID passado', function () {
            return service_1.default.getById(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    mocha_1.describe('Metodo getByEmail', function () {
        it('Retornar um usuurio de acordo com o EMAIL passado', function () {
            return service_1.default.getByEmail(defaultUser.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
});
