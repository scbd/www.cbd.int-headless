import { ApiOptions } from "./api-options"
export interface DrupalApiOptions extends ApiOptions {
    drupalBaseUrl: string,
    drupalClientId: string,
    drupalClientSecret: string,
    drupalScope: string
};