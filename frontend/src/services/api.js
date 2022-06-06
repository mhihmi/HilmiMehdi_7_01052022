/* eslint-disable prettier/prettier */
import { useAuthStore } from "@/store/useAuth";
// eslint-disable-next-line no-unused-vars
class ApiManager {
    baseUrl = `${process.env.VUE_APP_API_URL}/api`;

    headers(options = {}) {
        const token = useAuthStore().token;
        const contentType = options.isFormData
            ? {}
            : { "Content-Type": "application/json" };

        return {
            ...contentType,
            Authorization: "Bearer " + `${token}`,
        };
    }

    async post(endpoint, body, options = {}) {
        let defaultOptions = {
            isFormData: false,
            Authorization: false
        }
        options = Object.assign(defaultOptions, options)
        let data = await fetch(this.baseUrl + endpoint, {
            method: 'POST',
            body: options.isFormData ? body : JSON.stringify(body),
            headers: this.headers(options)
        });
        let result = await data.json();
        return result;
    }

    async get(endpoint) {
        let data = await fetch(this.baseUrl + endpoint, {
            // method: 'GET', //Default
            headers: this.headers()
        });
        let result = await data.json();
        return result;
    }

    async put(endpoint, body, options = {}) {
        let data = await fetch(this.baseUrl + endpoint, {
            method: 'PUT',
            body: options.isFormData ? body : JSON.stringify(body),
            headers: this.headers(options)
        });
        let result = await data.json();
        return result;
    }

    async delete(endpoint) {
        let data = await fetch(this.baseUrl + endpoint, {
            method: 'DELETE',
            headers: this.headers()
        });
        let result = await data.json();
        return result;
    }
}

export const apiManager = new ApiManager()