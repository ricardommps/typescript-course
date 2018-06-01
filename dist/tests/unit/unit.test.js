"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var mocha_1 = require("mocha");
mocha_1.describe('Testes Unitarios do Controller', function () {
    //describe('Metodo Create', () => {
    //    it('Deve criar um novo Usuario', () => {
    //        const novoUsuario = {
    //            id: 2,
    //            name: 'Novo Usuario Teste',
    //            email: 'novousuario@gmail.com',
    //            password: '1234'
    //        };
    //        const user = new User();
    //        return user.create(novoUsuario)
    //            .then(data => {
    //                expect(data.dataValues).to.have.all.keys(
    //                    ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
    //                )
    //            })
    //    });
    //});
    mocha_1.describe('Metodo GET Users', function () {
        it('Deve retornar uma lista com todos os Usu�rios', function () {
            var user = new service_1.default();
            return user.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    //describe('Metodo Update', () => {
    //    it('Deve atualizar um Usuario', () => {
    //        const usuarioAtualizado = {
    //            name: 'Nome atualizado',
    //            email: 'atualizado@gmail.com'
    //        };
    //        const user = new User();
    //        return user.update(1, usuarioAtualizado).then(data => {
    //            expect(data[0]).to.be.equal(1);
    //        })
    //    });
    //});
    //describe('Metodo Delete', () => {
    //    it('Deve deletar um Usuario', () => {
    //        const user = new User();
    //        return user.delete(1).then(data => {
    //            expect(data).to.be.equal(1);
    //        })
    //    });
    //});
    mocha_1.describe('Metodo getById', function () {
        it('Retornar um usuurio de acordo com o ID passado', function () {
            var user = new service_1.default();
            return user.getById(2).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    mocha_1.describe('Metodo getByEmail', function () {
        it('Retornar um usuurio de acordo com o EMAIL passado', function () {
            var email = 'novousuario@gmail.com';
            var user = new service_1.default();
            return user.getByEmail(email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
});
