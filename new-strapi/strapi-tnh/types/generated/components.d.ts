import type { Schema, Struct } from '@strapi/strapi';

export interface FeaturesFeatures extends Struct.ComponentSchema {
  collectionName: 'components_features_features';
  info: {
    displayName: 'features';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'features.features': FeaturesFeatures;
    }
  }
}
