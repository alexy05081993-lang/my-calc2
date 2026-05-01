import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { CreateLeadBody, GetStatsParams, HealthStatus, Lead, LeadList, ListLeadsParams, Stats, TrackEventBody } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a lead
 */
export declare const getCreateLeadUrl: () => string;
export declare const createLead: (createLeadBody: CreateLeadBody, options?: RequestInit) => Promise<Lead>;
export declare const getCreateLeadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadBody>;
}, TContext>;
export type CreateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof createLead>>>;
export type CreateLeadMutationBody = BodyType<CreateLeadBody>;
export type CreateLeadMutationError = ErrorType<unknown>;
/**
 * @summary Create a lead
 */
export declare const useCreateLead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadBody>;
}, TContext>;
/**
 * @summary Track an analytics event
 */
export declare const getTrackEventUrl: () => string;
export declare const trackEvent: (trackEventBody: TrackEventBody, options?: RequestInit) => Promise<void>;
export declare const getTrackEventMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof trackEvent>>, TError, {
        data: BodyType<TrackEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof trackEvent>>, TError, {
    data: BodyType<TrackEventBody>;
}, TContext>;
export type TrackEventMutationResult = NonNullable<Awaited<ReturnType<typeof trackEvent>>>;
export type TrackEventMutationBody = BodyType<TrackEventBody>;
export type TrackEventMutationError = ErrorType<unknown>;
/**
 * @summary Track an analytics event
 */
export declare const useTrackEvent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof trackEvent>>, TError, {
        data: BodyType<TrackEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof trackEvent>>, TError, {
    data: BodyType<TrackEventBody>;
}, TContext>;
/**
 * @summary List all leads (admin)
 */
export declare const getListLeadsUrl: (params: ListLeadsParams) => string;
export declare const listLeads: (params: ListLeadsParams, options?: RequestInit) => Promise<LeadList>;
export declare const getListLeadsQueryKey: (params?: ListLeadsParams) => readonly ["/api/admin/leads", ...ListLeadsParams[]];
export declare const getListLeadsQueryOptions: <TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<void>>(params: ListLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLeadsQueryResult = NonNullable<Awaited<ReturnType<typeof listLeads>>>;
export type ListLeadsQueryError = ErrorType<void>;
/**
 * @summary List all leads (admin)
 */
export declare function useListLeads<TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<void>>(params: ListLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get analytics stats (admin)
 */
export declare const getGetStatsUrl: (params: GetStatsParams) => string;
export declare const getStats: (params: GetStatsParams, options?: RequestInit) => Promise<Stats>;
export declare const getGetStatsQueryKey: (params?: GetStatsParams) => readonly ["/api/admin/stats", ...GetStatsParams[]];
export declare const getGetStatsQueryOptions: <TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<void>>(params: GetStatsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getStats>>>;
export type GetStatsQueryError = ErrorType<void>;
/**
 * @summary Get analytics stats (admin)
 */
export declare function useGetStats<TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<void>>(params: GetStatsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map