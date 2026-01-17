
import React, { useState, useEffect } from 'react';

interface Props {
  onAction: (action: 'FEED' | 'SLAP') => void;
  onEnd: () => void;
  onClose: () => void;
}

const WhistlePanel: React.FC<Props> = ({ onAction, onEnd, onClose }) => {
  const [animState, setAnimState] = useState<'IDLE' | 'FEEDING' | 'SLAPPING' | 'LEAVING'>('IDLE');
  const [scale, setScale] = useState(1);

  const handleAction = (type: 'FEED' | 'SLAP') => {
    onAction(type);
    setAnimState(type === 'FEED' ? 'FEEDING' : 'SLAPPING');
    
    if (type === 'FEED') {
      // Feeding: Scale up horse, stay a bit, then leave
      setTimeout(() => {
        setScale(1.5);
        setTimeout(() => {
          setAnimState('LEAVING');
          setTimeout(onEnd, 800);
        }, 1200);
      }, 300);
    } else {
      // Slapping: Wiggle + Effects, then leave
      setTimeout(() => {
        setTimeout(() => {
          setAnimState('LEAVING');
          setTimeout(onEnd, 800);
        }, 1500);
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Panel */}
      <div className="relative z-10 w-full max-w-sm">
        {animState === 'IDLE' ? (
          <div className="bg-white border-4 border-black rounded-[2rem] p-8 flex flex-col gap-6 animate-[bounceIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-playful text-center mb-4">你想怎么互动？</h3>
            
            <button 
              onClick={() => handleAction('FEED')}
              className="group flex flex-col items-center gap-3 p-6 border-2 border-black rounded-2xl bg-green-100 hover:bg-green-200 active:scale-95 transition-all"
            >
              <span className="text-5xl group-hover:scale-125 transition-transform">🌿</span>
              <span className="font-playful text-xl">投喂草料</span>
            </button>

            <button 
              onClick={() => handleAction('SLAP')}
              className="group flex flex-col items-center gap-3 p-6 border-2 border-black rounded-2xl bg-pink-100 hover:bg-pink-200 active:scale-95 transition-all"
            >
              <span className="text-5xl group-hover:scale-125 transition-transform">👋</span>
              <span className="font-playful text-xl">拍马屁股</span>
            </button>

            <button 
              onClick={onClose}
              className="mt-2 text-gray-400 font-playful hover:text-black transition-colors"
            >
              算了，走马观花
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 relative">
            {/* The Horse Actor */}
            <div 
              className={`text-9xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                animState === 'LEAVING' ? 'translate-x-[200vw] rotate-12' : 'translate-x-0'
              } ${animState === 'SLAPPING' ? 'animate-wiggle' : ''}`}
              style={{ transform: `scale(${scale})` }}
            >
              {animState === 'FEEDING' ? '🐎' : '🐴'}
            </div>

            {/* Effects */}
            {animState === 'FEEDING' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex gap-2 animate-[pulse_1s_infinite]">
                   <span className="text-3xl">✨</span>
                   <span className="text-3xl">🌿</span>
                   <span className="text-3xl">✨</span>
                </div>
              </div>
            )}

            {animState === 'SLAPPING' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex flex-wrap w-40 h-40 animate-[spin_3s_linear_infinite]">
                  {Array.from({length: 8}).map((_, i) => (
                    <span key={i} className="text-2xl animate-ping" style={{animationDelay: `${i*100}ms`}}>🌈</span>
                  ))}
                </div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-black font-brush px-4 py-2 text-2xl rotate-12">
                   啪！
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounceIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg) translateX(-10px); }
          50% { transform: rotate(10deg) translateX(10px); }
        }
        .animate-wiggle {
          animation: wiggle 0.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhistlePanel;
