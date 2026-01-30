export interface CSR {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  blogsubtitle: string;
  description: string;
  description_fr?: string;
  description_es?: string;
  description_zh?: string;
  description_ru?: string;
  shortdesc: string;
  shortdesc_fr?: string;
  shortdesc_es?: string;
  shortdesc_zh?: string;
  shortdesc_ru?: string;
  longdesc: string;
  longdesc_fr?: string;
  longdesc_es?: string;
  longdesc_zh?: string;
  longdesc_ru?: string;
  coverImage: string;
  image: string[];
}
