export interface VendorEntity {
  id: number;

  name: string;

  description: string;

  contact: string;

  status: string;

  tags: string[];

  defaultRTO: number;

  defaultRPO: number;

  createdAt: string;

  updatedAt: string;
}
