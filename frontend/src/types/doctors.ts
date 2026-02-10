export interface Image {
  id: number;
  url: string;
  alt: string;
}

export interface Doctor {
  id: number;
  name: string;
  role: string;
  bio: string;
  services_offered: number[];
  research_publications: string[];
  awards: string[];
  images: Image[];
}
