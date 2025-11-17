import React from 'react';

type Member = {
  name: string;
  title?: string;
  image?: string;
  bio?: string;
};

const defaultTeam: Member[] = [
  { name: 'Dr. Jane Mwangi', title: 'Lead Consultant', image: '/src/assets/doctorsImages/jane.png', bio: 'Consultant with expertise in acute care and trauma management.' },
  { name: 'Dr. Peter Otieno', title: 'Senior Surgeon', image: '/src/assets/doctorsImages/peter.png', bio: 'Specialist surgeon with a focus on emergency procedures.' },
  { name: 'Nurse Lydia Kimani', title: 'Head Nurse', image: '/src/assets/images/nurse.png', bio: 'Head nurse overseeing A&E nursing teams and patient flow.' },
  { name: 'Dr. Samuel Karanja', title: 'Emergency Physician', image: '/src/assets/images/image1.png', bio: 'Board-certified in emergency medicine with 10+ years of experience.' },
];

const TeamSection: React.FC<{ team?: Member[]; title?: string; className?: string }> = ({ team = defaultTeam, title = 'Our Team', className }) => {
  return (
    <section className={`container mx-auto px-4 py-12 ${className ?? ''}`}>
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-3">Experienced clinical team delivering compassionate care.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {team.map((m, i) => (
          <article key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white -mt-14 mb-4">
              {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <div />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mt-2">{m.name}</h3>
            {m.title && <div className="text-sm text-gray-600 mt-1">{m.title}</div>}
            {m.bio && <p className="text-sm text-gray-600 mt-3">{m.bio}</p>}
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
