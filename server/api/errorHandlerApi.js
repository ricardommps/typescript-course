"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerApi(err, req, res, next) {
    console.error("'API error handler foi executada: " + err);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Errro Interno do Servidor'
    });
}
exports.errorHandlerApi = errorHandlerApi;
