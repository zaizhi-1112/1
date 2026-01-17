
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS, HORSE_RESULTS, SQUARE_DATA } from './constants';
import { HorseTypeKey, SquareCard } from './types';
import QuizView from './views/QuizView';
import ResultView from './views/ResultView';
import SquareView from './views/SquareView';
import WhistlePanel from './components/WhistlePanel';

type ViewState = 'QUIZ' | 'WAITING' | 'RESULT' | 'SQUARE';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('QUIZ');
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [resultKey, setResultKey] = useState<HorseTypeKey | null>(null);
  const [activeSquareIndex, setActiveSquareIndex] = useState(0);
  const [isWhistleOpen, setIsWhistleOpen] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);

  // Quiz completion logic
  const handleQuizFinish = (results: boolean[]) => {
    setAnswers(results);
    setView('WAITING');
    
    // Simulate waiting animation
    setTimeout(() => {
      const key = calculateResult(results);
      setResultKey(key);
      setView('RESULT');
    }, 2500);
  };

  const calculateResult = (ans: boolean[]): HorseTypeKey => {
    const allYes = ans.every(v => v);
    const allNo = ans.every(v => !v);
    if (allYes) return 'MARRY_GO_ROUND';
    if (allNo) return 'COLLECTION_HORSE';
    if (ans[0] && ans[3]) return 'KISS_ASS';
    if (!ans[1] && !ans[2]) return 'HAJIMA';
    if (!ans[3]) return 'DAMN_HORSE';
    if (ans.slice(0, 4).every(v => v) && !ans[4]) return 'KING_HORSE';
    if (ans[1] && ans[2] && ans[4]) return 'MULE_HORSE';
    return 'ZEBRA';
  };

  const handleRestartQuiz = () => {
    setAnswers([]);
    setView('QUIZ');
  };

  const handleEnterSquare = () => {
    setView('SQUARE');
  };

  const handleNextCard = useCallback(() => {
    setActiveSquareIndex(prev => (prev + 1) % SQUARE_DATA.length);
  }, []);

  const handleWhistleAction = (action: 'FEED' | 'SLAP') => {
    setIsInteractionLocked(true);
    // Panel will close after animation, handled by WhistlePanel callback
  };

  const onInteractionEnd = () => {
    setIsWhistleOpen(false);
    setIsInteractionLocked(false);
    handleNextCard();
  };

  return (
    <div className="h-screen w-screen collage-bg paper-texture overflow-hidden flex flex-col relative text-[#2d2a2e]">
      {/* Background elements */}
      <div className="absolute top-4 left-4 opacity-30 select-none pointer-events-none">
        <div className="w-24 h-12 bg-blue-300 border-2 border-dashed border-blue-500 rounded-sm transform -rotate-12 flex items-center justify-center font-playful text-xs">
          STAMP
        </div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 select-none pointer-events-none">
        <span className="text-6xl font-brush">嫡了马</span>
      </div>

      {/* Main View Container */}
      <div className="flex-1 flex justify-center items-center px-4 md:px-0">
        <div className="w-full max-w-[640px] h-full relative flex items-center justify-center">
          
          {/* Desktop Side Panels (Equal Weight Decoration) */}
          <div className="hidden lg:flex fixed left-[max(0px,calc(50vw-600px))] top-1/2 -translate-y-1/2 w-[240px] h-[400px] flex-col gap-4 px-4">
             <div className="flex-1 border-2 border-black/10 rounded-2xl bg-white/40 backdrop-blur-sm p-4 collage-card-inner">
                <p className="font-playful text-gray-500 text-sm">今日宜：宣泄</p>
                <div className="mt-4 border-t border-dashed border-black/10 pt-4">
                   <div className="w-full h-32 bg-gray-200/50 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🏇</span>
                   </div>
                </div>
             </div>
          </div>
          <div className="hidden lg:flex fixed right-[max(0px,calc(50vw-600px))] top-1/2 -translate-y-1/2 w-[240px] h-[400px] flex-col gap-4 px-4">
             <div className="flex-1 border-2 border-black/10 rounded-2xl bg-white/40 backdrop-blur-sm p-4 collage-card-inner">
                <p className="font-playful text-gray-500 text-sm">忌：自我PUA</p>
                <div className="mt-4 border-t border-dashed border-black/10 pt-4">
                   <div className="w-full h-32 bg-gray-200/50 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🌵</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Core App View */}
          {view === 'QUIZ' && <QuizView onFinish={handleQuizFinish} />}
          
          {view === 'WAITING' && (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <div className="w-48 h-48 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-8xl">
                {['🦓', '🐎', '🎠', '🦄'][Math.floor(Date.now() / 200) % 4]}
              </div>
              <p className="mt-8 font-playful text-2xl tracking-widest animate-bounce">正在鉴定你的职场马力...</p>
            </div>
          )}

          {view === 'RESULT' && resultKey && (
            <ResultView 
              horseKey={resultKey} 
              onRestart={handleRestartQuiz} 
              onGoSquare={handleEnterSquare} 
            />
          )}

          {view === 'SQUARE' && (
            <SquareView 
              activeIndex={activeSquareIndex} 
              onWhistle={() => setIsWhistleOpen(true)}
              isLocked={isInteractionLocked}
            />
          )}
        </div>
      </div>

      {/* Interaction Layer */}
      {isWhistleOpen && (
        <WhistlePanel 
          onAction={handleWhistleAction} 
          onEnd={onInteractionEnd}
          onClose={() => !isInteractionLocked && setIsWhistleOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
