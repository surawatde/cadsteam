export type ProductCategory = "Inspection" | "Reverse Engineering" | "Post-Processor";

export type ProductRow = {
  id: string;
  title: string;
  category: ProductCategory;
  price: string;
  image_url: string | null;
};

export type LicenseStatus = "active" | "expired" | "revoked";

export type LicenseRow = {
  id: string;
  user_id: string;
  product_id: string;
  license_key: string;
  status: LicenseStatus;
  last_checkin_date: string | null;
  next_checkin_due: string | null;
};
