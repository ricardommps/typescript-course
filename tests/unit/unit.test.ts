import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';
import { read } from 'fs';
import { describe } from 'mocha';

describe('Testes Unitarios do Controller', () => {
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

    describe('Metodo GET Users', () => {
        it('Deve retornar uma lista com todos os Usu�rios', () => {
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
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

    describe('Metodo getById', () => {
        it('Retornar um usuurio de acordo com o ID passado', () => {
            const user = new User();
            return user.getById(2).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        })
    })

    describe('Metodo getByEmail', () => {
        it('Retornar um usuurio de acordo com o EMAIL passado', () => {
            let email = 'novousuario@gmail.com'
            const user = new User();
            return user.getByEmail(email).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        })
    })

});
