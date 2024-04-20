import {defineStore} from "pinia";
import {axiosClient} from "../utils/axios";
import {useAuthedUserStore} from "@/stores/authedUser.js";

const CRUD = async ({resourceUrl, action, data, id = null, additionalParams = {}}) => {
    try {
        let url = id ? `${resourceUrl}/${id}` : resourceUrl;
        if (action === "get") url = id ? `${resourceUrl}/${id}` : resourceUrl;

        const token = useAuthedUserStore().auth.user.token;
        const headers = {
            "auth-token": `${token}`,
        };
        let response = {};

        switch (action) {
            case "get":
                response = await axiosClient.get(url, {params: additionalParams, headers});
                break;
            case "create":
                response = await axiosClient.post(url, data, {headers});
                break;
            case "update":
                response = await axiosClient.put(url, data, {headers});
                break;
            case "delete":
                response = await axiosClient.delete(url, {params: additionalParams});
                break;
            default:
                throw new Error("Invalid action type");
        }
        return response.data;
    } catch (error) {
        return error;
    }
}
export const useStudentStore = defineStore("students", {
    state: () => ({
        all: {
            loading: true,
            data: [],
        },
        single: {
            data: {},
            loading: true,
        },
    }),
    actions: {
        async getAll(options = {}) {
            this.$state.all.loading = true;
            const response = await CRUD({
                resourceUrl: "/students",
                action: "get",
                additionalParams: options,
            });

            this.$state.all.data = response;
            this.$state.all.loading = false;
        },
        async get(uid) {
            this.$state.single.loading = true;
            this.$state.single.data = null;
            const res = await CRUD({
                resourceUrl: `/students/${uid}`,
                action: "get",
            });
            this.$state.single.data = res;
            this.$state.single.loading = false;
            return res
        },
        async create(data) {
            return CRUD({
                resourceUrl: "/students",
                action: "create",
                data,
            });
        },
        async update(data) {
            return CRUD({
                resourceUrl: `/students/${data.id}`,
                action: "update",
                data,
            });
        },
        async delete(data) {
            return CRUD({
                resourceUrl: `/students/${data.id}`,
                action: "delete",
            });
        },
        async order(data) {
            console.log(data)
        },
        async publishedOne(data) {
            try {
                return await axiosClient.put("/students/" + data.id + "/publish");
            } catch (error) {
                console.log(error);
            }
        },
        async unPublishedOne(data) {
            try {
                return await axiosClient.put("/students/" + data.id + "/unpublish");
            } catch (error) {
                console.log(error);
            }
        },
        async publishedAll(datas) {
            let idsToPusblish = datas.map((data) => data.id);
            try {
                return await axiosClient.put("/students/publish", {
                    ids: idsToPusblish,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },

        async unPublishedAll(datas) {
            let idsToUnPusblish = datas.map((data) => data.id);
            try {
                return await axiosClient.put("/students/unpublish", {
                    ids: idsToUnPusblish,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },
        async deleteAll(datas) {
            let idsToDelete = datas.map((data) => data.id);
            try {
                return await axiosClient.delete("/students", {
                    data: { ids: idsToDelete },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    persist: true,
});
