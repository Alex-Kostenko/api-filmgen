"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
    getTypeOrmConfig() {
        return {
            type: 'postgres',
            url: this.getValue('DATABASE_URL'),
            password: this.getValue('DATABASE_PASSWORD'),
            synchronize: true,
            logging: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
    }
}
const configService = new ConfigService(process.env).ensureValues([
    'DATABASE_URL',
    'DATABASE_PASSWORD',
]);
exports.configService = configService;
//# sourceMappingURL=config.service.js.map