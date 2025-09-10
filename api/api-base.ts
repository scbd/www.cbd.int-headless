import { type ApiOptions } from "../types/api/api-options";

export default class ApiBase<T extends ApiOptions>
{
    config : T = {} as T
    constructor(config: T) {
        this.config = config;
    }
}
