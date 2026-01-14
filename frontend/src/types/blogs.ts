export interface Blog {
  id?: string;
  title: string;
  subtitle?: string;
  author: string;
  category?: string;
  shortdesc?: string;
  longdesc?: string;
  cover_image?: string;
  image?: string;
  isFeatured?: boolean;
}
