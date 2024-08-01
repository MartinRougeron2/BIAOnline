import { fetchData, type IResponse } from "../../lib/auth";
import type { VendorEntity } from "../../lib/types/entities/vendor.entity";
import { Vendor } from "../../lib/types/class/entities";


export const load = async () => {
    const data: IResponse | void = await fetchData('vendors');
    if (!data) {
        return { error: 'An error occurred', data: null};
    }
    if (data.status === 401) {
        return { error: 'You are not authorized to view this page', data: null};
    }
    const vendorsE = data.json as VendorEntity[];

    return { error: null, data: vendorsE.map((vendor) => new Vendor(vendor)) };
}