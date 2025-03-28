"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRoleRepository = void 0;
class InMemoryUserRoleRepository {
    constructor() {
        // Lista global de funciones
        this.allFunctions = [
            { id: "f1", name: "Gestión de empleados" },
            { id: "f2", name: "Incidencias" },
            { id: "f3", name: "Monitoreo de personal" },
            { id: "f4", name: "Inventario" },
            { id: "f5", name: "otros" },
            { id: "f6", name: "Perfil" },
            { id: "f7", name: "Configuración" },
            // { id: "f8", name: "Cerrar Sesión" }
        ];
        // Roles con funciones específicas
        this.roles = [
            {
                id: "1",
                name: "Administrador",
                description: "Administrador del sistema con acceso completo",
                permissions: [
                    { title: "Admin", functionIds: ["f1"] },
                    { title: "Operación", functionIds: ["f2", "f3", "f4", "f5"] },
                    { title: "Usuario", functionIds: ["f6", "f7"] }
                ]
            },
            {
                id: "2",
                name: "Operador",
                description: "Operador con acceso limitado a operaciones básicas",
                permissions: [
                    { title: "Admin", functionIds: [] },
                    { title: "Operación", functionIds: ["f2"] },
                    { title: "Usuario", functionIds: ["f6", "f7"] }
                ]
            },
            {
                id: "3",
                name: "Especialista PDM",
                description: "Especialista en análisis predictivo y diagnóstico",
                permissions: [
                    { title: "Admin", functionIds: [] },
                    { title: "Operación", functionIds: ["f2", "f3", "f4", "f5"] },
                    { title: "Usuario", functionIds: ["f6", "f7"] }
                ]
            },
            {
                id: "4",
                name: "Observador",
                description: "Rol con acceso solo a visualización de datos",
                permissions: [
                    { title: "Admin", functionIds: [] },
                    { title: "Operación", functionIds: ["f5"] },
                    { title: "Usuario", functionIds: ["f6", "f7"] }
                ]
            }
        ];
    }
    // Método para obtener todos los roles con permisos resueltos
    getAllRoles() {
        return this.roles.map(role => (Object.assign(Object.assign({}, role), { permissions: role.permissions.map(permission => ({
                title: permission.title,
                functions: permission.functionIds.map(functionId => { var _a; return (_a = this.allFunctions.find(func => func.id === functionId)) === null || _a === void 0 ? void 0 : _a.name; })
            }), this) })));
    }
    // Método para buscar un rol por nombre
    findByName(name) {
        const role = this.roles.find(role => role.name === name);
        if (!role)
            return null;
        return Object.assign(Object.assign({}, role), { permissions: role.permissions.map(permission => ({
                title: permission.title,
                functions: permission.functionIds.map(functionId => { var _a; return (_a = this.allFunctions.find(func => func.id === functionId)) === null || _a === void 0 ? void 0 : _a.name; })
            }), this) });
    }
}
exports.InMemoryUserRoleRepository = InMemoryUserRoleRepository;
//# sourceMappingURL=InMemoryUserRoleRepository.js.map