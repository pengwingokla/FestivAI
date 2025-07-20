import { Festival } from "@/data/festivals";

interface FestivalCardProps {
  festival: Festival;
  onClick: () => void;
}

export const FestivalCard = ({ festival, onClick }: FestivalCardProps) => {
  return (
    <div className="festival-card" onClick={onClick}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{festival.flag}</span>
        <div>
          <h3 className="text-xl font-bold text-foreground">{festival.name}</h3>
          <p className="text-muted-foreground">{festival.country}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
          {festival.date}
        </span>
      </div>
      
      <p className="text-foreground/80 mb-4 leading-relaxed">
        {festival.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {festival.highlights.map((highlight, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-accent/30 text-accent-foreground rounded-full text-xs font-medium"
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
};