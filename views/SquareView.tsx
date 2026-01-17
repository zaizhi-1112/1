
import React, { useState } from 'react';
import { SQUARE_DATA } from '../constants';
import CollageCard from '../components/CollageCard';

interface Props {
  activeIndex: number;
  onWhistle: () => void;
  isLocked: boolean;
}

const SquareView: React.FC<Props> = ({ activeIndex, onWhistle, isLocked }) => {
  const [activeTab, setActiveTab] = useState<'RANT' | 'FODDER'>('RANT');
  const filteredData = SQUARE_DATA.filter(item => item.type === activeTab);
  const card = filteredData[activeIndex % filteredData.length];

  return (
    <div className="w-full h-full flex flex-col pt-16 pb-8">
      {/* Top Nav */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
        <div className="bg-white/80 backdrop-blur-md border-2 border-black p-1 rounded-2xl flex gap-1 shadow-md">
          <button 
            onClick={() => setActiveTab('RANT')}
            className={`px-6 py-2 rounded-xl font-playful transition-all ${activeTab === 'RANT' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            破口大马
          </button>
          <button 
            onClick={() => setActiveTab('FODDER')}
            className={`px-6 py-2 rounded-xl font-playful transition-all ${activeTab === 'FODDER' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            电子草料
          </button>
        </div>
      </div>

      {/* Card Flow Container */}
      <div className="flex-1 flex items-center justify-center">
        <div key={card.id} className="w-full animate-[slideUp_0.6s_cubic-bezier(0.23,1,0.32,1)]">
          <CollageCard className="min-h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-1 border-2 border-black rounded-full font-playful text-sm ${activeTab === 'RANT' ? 'bg-red-400' : 'bg-green-400'}`}>
                #{card.tag}
              </span>
              <span className="text-gray-300 font-playful">@ {card.author}</span>
            </div>

            <div className="flex-1 flex items-center justify-center py-10">
              <p className="text-2xl md:text-3xl font-bold text-center leading-[1.6] font-playful italic">
                “{card.content}”
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={onWhistle}
                disabled={isLocked}
                className="group relative w-20 h-20 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale animate-whistle"
              >
                <span className="text-4xl">😙</span>
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-white border-2 border-black px-3 py-1 font-playful text-sm rounded-lg shadow-sm whitespace-nowrap">
                  吹口哨互动
                </div>
              </button>
            </div>
          </CollageCard>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-400 font-playful text-sm animate-pulse">
        {isLocked ? '马儿正在表演中...' : '上滑查看下一条吐槽'}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SquareView;
