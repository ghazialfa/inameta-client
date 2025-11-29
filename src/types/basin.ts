"use strict"

export interface BasinItem {
    area_id: string
    area_type: string
    area_desc_code: string
    product_type: string
}

export interface BasinResponse {
    items: BasinItem[]
    page_number: number
    page_size: number
    total_items: number
    total_pages: number
}
