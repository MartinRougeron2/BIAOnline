import type { VendorEntity } from "./vendor.entity";

interface ServiceEntity  {
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

type ServiceActivity = {
    id: number;
    name: string;
    RTO: number;
    RPO: number;
}

export type { ServiceEntity, ServiceActivity };