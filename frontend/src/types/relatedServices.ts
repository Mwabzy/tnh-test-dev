export interface RelatedServices {
  id: number;
  title: string;
  overview?: string;
  images: {
    url: string;
    alt?: string;
  }[];
}
