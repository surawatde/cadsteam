export type ProductCategory =
  | "Inspection"
  | "Reverse Engineering"
  | "Post-Processor"
  | "CAD";

export type PricingType = "free" | "paid";

export type DeploymentType = "offline" | "web";

export type ProductRow = {
  id: string;
  title: string;
  category: ProductCategory;
  price: string;
  image_url: string | null;
  description?: string | null;
  pricing_type?: PricingType | null;
  deployment_type?: DeploymentType | null;
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
