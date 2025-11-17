import React from 'react';
import { motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  name: string;
  avatar?: string;
  subtitle?: string;
};

type ClientsSayProps = {
  title?: string;
  testimonials?: Testimonial[];
};

const ClientsSay: React.FC<ClientsSayProps> = ({
  title = 'What our clients say',
  testimonials = [
    { quote: 'Excellent care and attention.', name: 'A. Njeri', avatar: '/src/assets/images/image1.png' },
    { quote: 'Professional and compassionate team.', name: 'J. Mwende', avatar: '/src/assets/images/image2.png' },
    { quote: 'Quick and accurate service!', name: 'S. Otieno', avatar: '/src/assets/images/image3.png' },
  ],
}) => {
  // Ensure we always render exactly 3 testimonial cards — pad or repeat if needed
  const defaultTestimonials: Testimonial[] = [
    { quote: 'Excellent care and attention.', name: 'A. Njeri', avatar: '/src/assets/images/image1.png' },
    { quote: 'Professional and compassionate team.', name: 'J. Mwende', avatar: '/src/assets/images/image2.png' },
    { quote: 'Quick and accurate service!', name: 'S. Otieno', avatar: '/src/assets/images/image3.png' },
  ];

  const source = (testimonials && testimonials.length > 0) ? testimonials : defaultTestimonials;
  const displayTestimonials: Testimonial[] = [];
  for (let i = 0; i < 3; i++) {
    displayTestimonials.push(source[i % source.length]);
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-gray-900">{title}</h3>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mt-2" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-6 overflow-x-auto md:overflow-visible">
          {displayTestimonials.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-red-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-700 italic">"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={t.avatar || '/src/assets/images/image1.png'} alt={t.name} className="w-10 h-10 object-cover rounded-full" />
              <div>
                <cite className="text-sm font-medium text-gray-900">{t.name}</cite>
                {t.subtitle && <div className="text-sm text-gray-600">{t.subtitle}</div>}
              </div>
            </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSay;
