import Hero from '../shared/Hero';
import TopicImageCard from '../shared/TopicImageCard';
import { CATEGORIES } from '../../data/categories';

const cat = CATEGORIES.find(c => c.key === 'tools');

export default function ToolsPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow={cat.eyebrow}
        title="Tools"
        em="& Calculators"
        inline
        sub={cat.description}
      />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cat.topics.map(topic => (
            <TopicImageCard key={topic.key} topic={topic} go={go} accentColour={cat.colour} />
          ))}
        </div>
      </div>
    </div>
  );
}
