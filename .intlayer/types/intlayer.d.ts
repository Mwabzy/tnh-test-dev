/* eslint-disable */
import { Locales } from 'intlayer';
import _4HMVjQmNPPTASAtR0TXB from './aboutUsPage.ts';
import _ofgUGxKZsZuDiJFlWlB0 from './about_the_hospital.ts';
import _cs5CRsWZcwqcJMoKxrGh from './admission_charges.ts';
import _bMwO633pM9DfPLiPN5PX from './convention_center.ts';
import _6tUmXc7GETvGFSpV280G from './featuresContent.ts';
import _BK0vsqalVnxph47FJixN from './heroContent.ts';
import _9oJrpkYFlJcaNsqkRz0L from './high_critical_care.ts';
import _X9iRurKH497vPPtmuJxG from './laundry_services.ts';
import _yNlXX6sL8MKvQ1nodPEY from './medical_tourism.ts';
import _eSOuEGGxwBhbAGhyESB1 from './navigationContent.ts';
import _FYpO7sdribQKYJeAUSxJ from './roomsandwardssection.ts';
import _6jao3YRqDgqHlQLnpgUC from './servicesSection.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "aboutUsPage": typeof _4HMVjQmNPPTASAtR0TXB;
    "about_the_hospital": typeof _ofgUGxKZsZuDiJFlWlB0;
    "admission_charges": typeof _cs5CRsWZcwqcJMoKxrGh;
    "convention_center": typeof _bMwO633pM9DfPLiPN5PX;
    "featuresContent": typeof _6tUmXc7GETvGFSpV280G;
    "heroContent": typeof _BK0vsqalVnxph47FJixN;
    "high_critical_care": typeof _9oJrpkYFlJcaNsqkRz0L;
    "laundry_services": typeof _X9iRurKH497vPPtmuJxG;
    "medical_tourism": typeof _yNlXX6sL8MKvQ1nodPEY;
    "navigationContent": typeof _eSOuEGGxwBhbAGhyESB1;
    "roomsandwardssection": typeof _FYpO7sdribQKYJeAUSxJ;
    "servicesSection": typeof _6jao3YRqDgqHlQLnpgUC;
  }

  type DeclaredLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | Locales.CHINESE | Locales.RUSSIAN;
  type RequiredLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | Locales.CHINESE | Locales.RUSSIAN;
  type ExtractedLocales = Extract<Locales, RequiredLocales>;
  type ExcludedLocales = Exclude<Locales, RequiredLocales>;
  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
}