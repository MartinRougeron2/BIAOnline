export interface CreateServiceDto {
  name: string;

  description: string;

  owner: string;

  status: string;

  activitiesSpecificId: string;

  location: string;

  RTO: string;

  RPO: string;

  vendorId: number;

  tags: string | string[];
}
