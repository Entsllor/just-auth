/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PrivateUserDto {
    /** @format uuid */
    id: string
    /**
     * @minLength 5
     * @maxLength 32
     * @pattern ^[a-zA-Z0-9_.]{5,32}$
     */
    username: string
    /** @maxLength 63 */
    lastName: string | null
    /** @maxLength 63 */
    firstName: string | null
    /** @maxLength 63 */
    secondName: string | null
    createdAt: any
    email: string
    updatedAt: any
    timezone: string | null
}

export interface PublicUserDto {
    /** @format uuid */
    id: string
    /**
     * @minLength 5
     * @maxLength 32
     * @pattern ^[a-zA-Z0-9_.]{5,32}$
     */
    username: string
    /** @maxLength 63 */
    lastName: string | null
    /** @maxLength 63 */
    firstName: string | null
    /** @maxLength 63 */
    secondName: string | null
    createdAt: any
}

export interface UpdateUserDto {
    /** @maxLength 63 */
    secondName?: string | null
    /** @maxLength 63 */
    firstName?: string | null
    /** @maxLength 63 */
    lastName?: string | null
    timezone?: string | null
}

export interface SignupDto {
    /** @format email */
    email: string
    /**
     * @minLength 8
     * @maxLength 255
     */
    password: string
    /**
     * @minLength 5
     * @maxLength 32
     * @pattern ^[a-zA-Z0-9_.]{5,32}$
     */
    username: string
    /** @maxLength 63 */
    lastName: string | null
    /** @maxLength 63 */
    firstName: string | null
    /** @maxLength 63 */
    secondName: string | null
    birthdate: any
    timezone: string | null
}

export interface LoginDto {
    /** @format email */
    email: string
    password: string
}

import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    HeadersDefaults,
    ResponseType
} from "axios"
import axios from "axios"

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
    extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType
    /** request body */
    body?: unknown
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">

export interface ApiConfig<SecurityDataType = unknown>
    extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
    secure?: boolean
    format?: ResponseType
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
    private secure?: boolean
    private format?: ResponseType

    constructor({
        securityWorker,
        secure,
        format,
        ...axiosConfig
    }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({...axiosConfig, baseURL: axiosConfig.baseURL || ""})
        this.secure = secure
        this.format = format
        this.securityWorker = securityWorker
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected mergeRequestParams(
        params1: AxiosRequestConfig,
        params2?: AxiosRequestConfig
    ): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method)

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method &&
                    this.instance.defaults.headers[
                        method.toLowerCase() as keyof HeadersDefaults
                    ]) ||
                    {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {})
            }
        }
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem)
        } else {
            return `${formItem}`
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key]
            const propertyContent: any[] = property instanceof Array ? property : [property]

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
            }

            return formData
        }, new FormData())
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const responseFormat = format || this.format || undefined

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>)
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body)
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? {"Content-Type": type} : {})
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path
        })
    }
}

/**
 * @title nestjs app
 * @version 1.0
 * @contact
 *
 * The nestjs app API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags default
     * @name GetAppInfo
     * @request GET:/
     */
    getAppInfo = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/`,
            method: "GET",
            ...params
        })

    users = {
        /**
         * No description
         *
         * @tags users
         * @name ReadMe
         * @request GET:/users/me
         * @secure
         */
        readMe: (params: RequestParams = {}) =>
            this.request<PrivateUserDto, any>({
                path: `/users/me`,
                method: "GET",
                secure: true,
                format: "json",
                ...params
            }),

        /**
         * No description
         *
         * @tags users
         * @name FindAll
         * @request GET:/users
         * @secure
         */
        findAll: (params: RequestParams = {}) =>
            this.request<PublicUserDto[], any>({
                path: `/users`,
                method: "GET",
                secure: true,
                format: "json",
                ...params
            }),

        /**
         * No description
         *
         * @tags users
         * @name FindOne
         * @request GET:/users/{id}
         * @secure
         */
        findOne: (id: string, params: RequestParams = {}) =>
            this.request<PublicUserDto, any>({
                path: `/users/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params
            }),

        /**
         * No description
         *
         * @tags users
         * @name Update
         * @request PUT:/users/{id}
         * @secure
         */
        update: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
            this.request<PrivateUserDto, any>({
                path: `/users/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params
            })
    }
    auth = {
        /**
         * No description
         *
         * @tags auth
         * @name Signup
         * @request POST:/auth/sign-up
         */
        signup: (data: SignupDto, params: RequestParams = {}) =>
            this.request<PrivateUserDto, any>({
                path: `/auth/sign-up`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params
            }),

        /**
         * No description
         *
         * @tags auth
         * @name Refresh
         * @request POST:/auth/refresh
         * @secure
         */
        refresh: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/auth/refresh`,
                method: "POST",
                secure: true,
                ...params
            }),

        /**
         * No description
         *
         * @tags auth
         * @name Login
         * @request POST:/auth/login
         */
        login: (data: LoginDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/auth/login`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params
            }),

        /**
         * No description
         *
         * @tags auth
         * @name Logout
         * @request POST:/auth/logout
         */
        logout: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/auth/logout`,
                method: "POST",
                ...params
            })
    }
}
