import Ajv from 'ajv';
import { camelCase, cloneDeep, mapKeys, pick } from 'lodash';
import { resolve } from 'path';
import { parse as parseArgv } from 'yargs';
import { envSchema, argvSchema, ENV_VARS, ARG_VARS } from './server-config-schema';

export class ServerConfig {
    readonly defaultLanguage: string;
    readonly distFolderPath: string;
    readonly isProduction: boolean;
    readonly label: string;
    readonly port: number;
    readonly supportedLanguages: string[];
    readonly useShutdownHandler: boolean;

    constructor() {
        this.distFolderPath = resolve(process.cwd(), './dist/client');
        this.label = 'angular-app-template';
        this.defaultLanguage = 'en';
        this.supportedLanguages = ['en'];

        const mergedConfigs = this.mergeConfigs();

        this.isProduction = process.env['NODE_ENV'] === 'production';
        this.port = mergedConfigs.port;
        this.useShutdownHandler = mergedConfigs.useShutdownHandler;
    }

    private static formatAjvError(errors: Ajv.ErrorObject[]) {
        // TODO add better error formatting
        throw new Ajv.ValidationError(errors);
    }

    private static validateArgv(ajv: Ajv, argVars: object) {
        const valid = ajv.validate(argvSchema, argVars);
        if (!valid) {
            throw ServerConfig.formatAjvError(ajv.errors);
        }
    }

    private static validateEnv(ajv: Ajv, envVars: object) {
        const valid = ajv.validate(envSchema, envVars);
        if (!valid) {
            throw ServerConfig.formatAjvError(ajv.errors);
        }
    }

    private mergeConfigs() {
        const ajv = new Ajv({
            allErrors: true,
            coerceTypes: true,
            format: 'full',
            useDefaults: true,
        });
        const relevantEnvVars = pick(process.env, ENV_VARS);
        const argvCopy = pick(cloneDeep(parseArgv()), ARG_VARS);
        ServerConfig.validateEnv(ajv, relevantEnvVars);
        ServerConfig.validateArgv(ajv, argvCopy);

        const mappedEnvVars = mapKeys(relevantEnvVars, (value: any, key: string) => camelCase(key));
        return Object.assign({}, mappedEnvVars, argvCopy) as any;
    }
}

export const serverConfig = new ServerConfig();
