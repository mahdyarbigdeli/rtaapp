import { ColDef } from "@ag-grid-community/core";

export interface ISelectUser {
  id: number;
  username: string;
  email: string;
  role: string;
  admin_profile: Adminprofile | null;
  supplier_profile: Supplierprofile | null;
  customer_profile: null;
}

interface Supplierprofile {
  company_name: string;
  contact_person_name: string;
  phone_number: string;
  business_registration_number: string;
  business_address: string;
  tax_id: string;
  profile_picture: null;
  lat: string;
  lng: string;
}

interface Adminprofile {
  full_name: string;
  phone_number: string;
  profile_picture: null;
}

export const userColumnDefs: ColDef[] = [
  { headerName: "شناسه کاربری", field: "id" },
  { headerName: "نام کاربری", field: "username" },
  { headerName: "ایمیل", field: "email" },
  { headerName: "نقش", field: "role" },
];
