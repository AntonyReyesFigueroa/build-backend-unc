"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const uuid_1 = require("uuid");
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserId {
    /**
     * Constructor de la clase UserId.
     * Si no se proporciona un valor, se generará automáticamente un UUID válido.
     * @param value - Valor opcional del ID. Si no se proporciona, se generará automáticamente.
     */
    constructor(value) {
        if (value) {
            if (!this.isValidUUID(value)) {
                throw new UserNotFoundError_1.UserNotFoundError("El ID debe ser un UUID válido.");
            }
            this.value = value;
        }
        else {
            // Generar un UUID automáticamente si no se proporciona uno
            this.value = (0, uuid_1.v4)();
        }
    }
    /**
     * Verifica si un valor es un UUID válido.
     * @param value - Valor a validar.
     * @returns `true` si el valor es un UUID válido, `false` en caso contrario.
     */
    isValidUUID(value) {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(value);
    }
}
exports.UserId = UserId;
//# sourceMappingURL=UserId.js.map