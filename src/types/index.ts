export interface NavItem {
  name: string;
  href: string;
  dropdown?: NavItem[];
}

export interface Service {
  name: string;
  href: string;
  description: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ProjectCase {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}
