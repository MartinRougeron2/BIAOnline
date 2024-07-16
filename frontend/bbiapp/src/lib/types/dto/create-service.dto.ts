

export interface CreateServiceDto {
    
    name: string;

    
    description: string;

    
    owner: string;

    
    status: string;

    
    activitiesSpecificId: string[];

    
    location: string;

    
    RTO: number;

    
    RPO: number;

    
    vendorId: number;

    
    tags: string[];

}
