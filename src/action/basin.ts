"use strict"

import { api } from "@/lib/axios"
import { BasinResponse } from "@/types/basin"
import { useQuery } from "@tanstack/react-query"

export type GetBasinsParams = { offset?: number; limit?: number }

export async function getBasins(params?: GetBasinsParams) {
    const { offset = 0, limit = 10 } = params ?? {}
    const { data } = await api.get<BasinResponse>("/basin", { params: { offset, limit } })
    return data
}

export function useBasinsQuery(params?: GetBasinsParams) {
    const { offset = 0, limit = 10 } = params ?? {}
    return useQuery({
        queryKey: ["basins", offset, limit],
        queryFn: () => getBasins({ offset, limit }),
    })
}
