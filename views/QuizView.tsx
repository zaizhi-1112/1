
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import CollageCard from '../components/CollageCard';

interface Props {
  onFinish: (results: boolean[]) => void;
}

const QuizView: React.FC<Props> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const question = QUESTIONS[currentIndex];

  const handleChoice = (val: boolean) => {
    const newAnswers = [...answers, val];
    if (currentIndex < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setDragOffset(0);
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(newAnswers);
    }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - window.innerWidth / 2;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (Math.abs(dragOffset) > 100) {
      handleChoice(dragOffset > 0);
    } else {
      setDragOffset(0);
    }
  };

  const rotation = dragOffset / 10;
  const feedbackOpacity = Math.min(Math.abs(dragOffset) / 100, 1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
      <div className="mb-8 text-center">
        <span className="bg-black text-white px-4 py-1 rounded-full font-playful text-sm">
          测测你是什么马 ({currentIndex + 1}/5)
        </span>
      </div>

      <div 
        className="w-full flex justify-center touch-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CollageCard 
          className="aspect-[3/4] flex flex-col items-center justify-between"
          style={{ 
            transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
            transition: isSwiping ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Yes/No Feedback Stickers */}
          <div 
            className="absolute -right-8 top-10 bg-green-400 border-2 border-black p-4 font-playful text-2xl rotate-12 shadow-md pointer-events-none"
            style={{ opacity: dragOffset > 0 ? feedbackOpacity : 0 }}
          >
            YES! ✅
          </div>
          <div 
            className="absolute -left-8 top-10 bg-red-400 border-2 border-black p-4 font-playful text-2xl -rotate-12 shadow-md pointer-events-none"
            style={{ opacity: dragOffset < 0 ? feedbackOpacity : 0 }}
          >
            NO! ❌
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-6 font-playful">
              {question.text}
            </h2>
            <p className="text-gray-400 font-medium italic">
              {question.hint}
            </p>
          </div>

          <div className="w-full border-t border-dashed border-black/20 pt-6 flex justify-between items-center">
            <div className="text-gray-300 text-xs font-playful">← 左滑 NO</div>
            <div className="w-12 h-1 bg-gray-100 rounded-full"></div>
            <div className="text-gray-300 text-xs font-playful">右滑 YES →</div>
          </div>
        </CollageCard>
      </div>

      <p className="mt-8 text-gray-400 text-sm animate-bounce">按住卡片左右滑动作出你的选择</p>
    </div>
  );
};

export default QuizView;
