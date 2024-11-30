import type { AxiosResponse } from "axios";
import type { AppException, RequestType, ResponseMessage } from "~/types/common";

export const useAxios = () => {

    const { $axios } = useNuxtApp()
    const config = useRuntimeConfig()
    const jwtToken = useCookie(config.public.jwtKeyName);
    const { canSyncActiveStatusToServer } = useDevice();
    const { appToast, appLoading } = useBase();
    const callAxiosProcess = async <T>(req: RequestType, devLog: boolean = true): Promise<AxiosResponse<T>> => {
        const canSyncOnlineStatus = await canSyncActiveStatusToServer();
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.Authorization = `Bearer ${jwtToken.value || ''}`;
            // console.log('useAxios > callAxios :', req);
            if (req.baseURL != undefined) {
                $axios.defaults.baseURL = req.baseURL;
            } else {
                $axios.defaults.baseURL = config.public.apiBase;
            }

            if (req.contentType) {
                $axios.defaults.headers['Content-Type'] = req.contentType;
            } else {
                $axios.defaults.headers['Content-Type'] = 'application/json';
            }
            if (req.responseType) {
                $axios.defaults.responseType = req.responseType;
            } else {
                $axios.defaults.responseType = 'json';
            }

            $axios.defaults.headers['X-Sync-Active'] = canSyncOnlineStatus ? '1' : '0';
            $axios({
                method: req.method,
                url: req.API,
                data: req.body ? req.body : undefined
            }).then((response) => {
                if (import.meta.dev && devLog && !import.meta.server) {
                    console.log(`api ${$axios.defaults.baseURL}${req.API}`, response);
                }
                resolve(response as AxiosResponse<T>);
            }).catch((error) => {
                // appLoading(false);
                if (error?.response) {
                    if (error.response.status != 401 && error.response.status != 403) {
                        const responseData = error?.response?.data;
                        if (responseData) {
                            exeptionNotify(error?.response);
                        }
                    }
                }
                reject(error);
            });
        });
    };
    const callAxios = async <T>(req: RequestType): Promise<T | null> => {
        return new Promise(async (resolve, reject) => {
            callAxiosProcess<T>(req)
                .then(async (response) => {
                    if (response.status != 401 && response.status != 403) {
                        exeptionNotify(response);
                    }
                    const finalResponse = await validateServerResponse<T>(response.data);
                    resolve(finalResponse);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const callAxiosFile = async <T>(req: RequestType): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            callAxiosProcess<T>(req, false)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const validateServerResponse = <T>(res: T): Promise<T | null> => {
        if (!res) {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
        if (isAppException(res) || isServerException(res)) {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
        return new Promise((resolve) => {
            resolve(res);
        });
    };
    const exeptionNotify = <T>(response: AxiosResponse<T>) => {
        if (response && response.data) {
            if (isAppException(response.data)) {
                notifyMessage(response.data);
            } else if (isServerResponseMessage(response.data)) {
                notifyServerMessage(response.data);
            }
        }
    };
    const notifyMessage = (response: AppException | null): void => {
        console.error(response);
        if (import.meta.server || response == null || response == undefined) {
            return;
        }
        appLoading(false);
        appToast(
            `<strong>${response.message}</strong><br> ${response.errors?.join(
                '<br>'
            )}`,
            {
                multiLine: true,
                html: true,
                type: 'negative',
                timeout: 15*1000,
                position: 'bottom',
            }
        );
    };
    const notifyServerMessage = (response: ResponseMessage): void => {
        if (import.meta.server || !response.message) {
            return;
        }
        appLoading(false);
        appToast(response.message, {
            multiLine: true,
            html: true,
            type:
                response.status == 'OK' || response.status == 'CREATED'
                    ? 'positive'
                    : 'negative',
            timeout:
                response.status == 'OK' || response.status == 'CREATED'
                    ? 3 * 1000
                    : 10 * 1000,
            position: 'bottom',
        });
    }
    return { callAxios, validateServerResponse, callAxiosFile, callAxiosProcess };
};