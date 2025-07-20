import { useState } from "react";
import { festivals, months, Festival } from "@/data/festivals";
import { FestivalCard } from "@/components/FestivalCard";
import { AIAssistantModal } from "@/components/AIAssistantModal";

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState("july");
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentFestivals = festivals[selectedMonth] || [];

  const handleFestivalClick = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFestival(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          🌍 FestivAI
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Discover Global Festivals & Let AI Plan Your Journey
        </p>
      </div>

      {/* Month Selector */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {months.map((month) => (
            <button
              key={month.key}
              onClick={() => setSelectedMonth(month.key)}
              className={`month-button ${selectedMonth === month.key ? 'active' : ''}`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>

      {/* Festival Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFestivals.map((festival) => (
            <FestivalCard
              key={festival.id}
              festival={festival}
              onClick={() => handleFestivalClick(festival)}
            />
          ))}
        </div>

        {currentFestivals.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card max-w-md mx-auto p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                No festivals found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different month to discover amazing festivals around the world!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      {selectedFestival && (
        <AIAssistantModal
          festival={selectedFestival}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Index;
