export interface IUserCU {
  username: string;
  email: string;
  password: string;
  role: string;
  admin_profile?: IAdminprofile;
  supplier_profile?: ISupplierprofile;
  customer_profile?: ICustomerprofile;
}

interface ICustomerprofile {
  full_name: string;
  phone_number: string;
  profile_picture: string;
  shipping_address: string;
  billing_address: string;
}

interface ISupplierprofile {
  company_name: string;
  contact_person_name: string;
  phone_number: string;
  business_registration_number: string;
  business_address: string;
  tax_id: string;
  profile_picture: string;
  lat: string;
  lng: string;
}

interface IAdminprofile {
  full_name: string;
  phone_number: string;
  profile_picture: string;
}
