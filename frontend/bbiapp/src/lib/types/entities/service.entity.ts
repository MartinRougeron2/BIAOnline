import type { VendorEntity } from "./vendor.entity";

export interface ServiceEntity  {
    id: number;
    name: string;
    description: string;
    owner: string;
    status: string;
    location: string;
    RTO: number;
    RPO: number;
    vendorId: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    vendor: Partial<VendorEntity>;
}