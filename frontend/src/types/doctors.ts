export interface Doctor {
  id?: number;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  services_offered: number[];
  research_publications?: string;
  awards: string[];
}
