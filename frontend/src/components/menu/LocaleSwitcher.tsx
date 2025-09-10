
import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale, } from 'react-intlayer';
import { LocalesValues, Locales } from 'intlayer';

// Map locales to their display names and flag emojis
const localeOptions = [
  { value: Locales.ENGLISH, label: 'EN', flag: '🇬🇧' },
  { value: Locales.FRENCH, label: 'FR', flag: '🇫🇷' },
  { value: Locales.SPANISH, label: 'ES', flag: '🇪🇸' },
  { value: Locales.CHINESE, label: 'ZH', flag: '🇨🇳' },
  { value: Locales.RUSSIAN, label: 'RU', flag: '🇷🇺' },
];

const LocaleSwitcher: FC = () => {
  const { locale, setLocale } = useLocale();

  // Handle locale change
  const handleLocaleChange = (value: string) => {
    setLocale(value as LocalesValues);
  };

  return (
    <Select onValueChange={handleLocaleChange} value={locale}>
      <SelectTrigger className="flex items-center">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="w-12 z-[100]">
        <SelectGroup>
          {localeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center">
                <span className="mr-2">{option.flag}</span>
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;