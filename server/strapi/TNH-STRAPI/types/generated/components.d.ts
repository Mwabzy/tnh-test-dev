import type { Schema, Struct } from '@strapi/strapi';

export interface ContactInfoContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_info_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {};
}

export interface FeatureFeature extends Struct.ComponentSchema {
  collectionName: 'components_feature_features';
  info: {
    displayName: 'Feature';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface TestimonialTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact-info.contact-info': ContactInfoContactInfo;
      'feature.feature': FeatureFeature;
      'testimonial.testimonial': TestimonialTestimonial;
    }
  }
}
