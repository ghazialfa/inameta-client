"use strict";

import { api } from "@/lib/axios";
import { BasinResponse } from "@/types/basin";

export async function getBasins(params: { offset?: number; limit?: number }) {
    const { data } = await api.get<BasinResponse>(
        "/basin",
        { params }
    );
    return data;
}
