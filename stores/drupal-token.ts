import { defineStore } from 'pinia';
import getToken from '../composables/drupal';

export const useDrupalTokenStore = defineStore('drupal-token', {
    state: () => ({
        accessToken: '',
        timeout: 0
    }),
    getters: {},
    actions: {
        async getToken() {
            if(!this.accessToken || this.timeout < Date.now()) {
                const data = await getToken();
                this.accessToken = data.access_token;
                this.timeout = data.timeout;
            }
        },
        clearToken() {
            this.accessToken = '';
            this.timeout = 0;
        }
    }
});