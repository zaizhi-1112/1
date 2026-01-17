
import React from 'react';
import { HORSE_RESULTS } from '../constants';
import { HorseTypeKey } from '../types';

interface Props {
  horseKey: HorseTypeKey;
  onRestart: () => void;
  onGoSquare: () => void;
}

const ResultView: React.FC<Props> = ({ horseKey, onRestart, onGoSquare }) => {
  const info = HORSE_RESULTS[horseKey];

  return (
    <div className="w-full flex flex-col items-center animate-[posterIn_0.8s_cubic-bezier(0.23,1,0.32,1)] overflow-y-auto max-h-screen pb-12 pt-6">
      {/* 确诊海报主体 */}
      <div className="relative w-full max-w-[420px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-lg flex flex-col items-center px-10 py-12 mb-10 border border-white/50">
        
        {/* 顶部确诊文案 */}
        <div className="mb-2">
           <p className="text-3xl font-black text-black tracking-tight">2026正式确诊为</p>
        </div>

        {/* 马种大标题 */}
        <div className="mb-6">
           <h1 className="text-[80px] leading-tight font-black text-black tracking-tighter">{info.name}</h1>
        </div>

        {/* 海报中心图插画 */}
        <div className="flex-1 w-full aspect-square flex items-center justify-center relative my-4">
           {/* 背景微光 */}
           <div className="absolute inset-0 bg-radial-gradient from-gray-50 to-transparent opacity-50"></div>
           
           <div className="relative z-10 transition-transform hover:scale-105 duration-500">
              {/* 这里使用 Emoji 作为占位，实际应使用用户提供的 8 张插图文件 */}
              <div className="text-[140px] leading-none filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] select-none">
                {info.image}
              </div>
           </div>
           
           {/* 旋转木马特有的炫彩小星星特效（如果是旋转木马） */}
           {horseKey === 'MARRY_GO_ROUND' && (
             <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-0 left-10 text-xl animate-pulse">✨</span>
                <span className="absolute bottom-10 right-0 text-2xl animate-bounce">🌈</span>
                <span className="absolute top-1/2 -right-4 text-lg animate-pulse">✨</span>
             </div>
           )}
        </div>

        {/* 底部海报释义 */}
        <div className="mt-8 w-full text-center">
           <p className="text-[28px] font-bold leading-tight text-black whitespace-pre-line tracking-tight">
             {info.desc}
           </p>
        </div>

        {/* 纸张质感蒙层 */}
        <div className="absolute inset-0 pointer-events-none opacity-5 paper-texture rounded-lg"></div>
      </div>

      {/* 极简功能按钮 */}
      <div className="w-full max-w-[420px] flex flex-col gap-4 px-8">
        <button 
          onClick={onRestart}
          className="w-full py-5 bg-black text-white rounded-2xl font-black text-xl active:scale-95 transition-all shadow-xl hover:bg-gray-900"
        >
          重新诊断
        </button>
        
        <div className="flex gap-4">
          <button 
            className="flex-1 py-4 bg-white border-4 border-black text-black rounded-2xl font-black text-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            分享海报
          </button>
          <button 
            onClick={onGoSquare}
            className="px-6 py-4 bg-blue-500 text-white border-4 border-black rounded-2xl font-black text-lg active:scale-95 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
            title="去广场"
          >
            📢
          </button>
        </div>
      </div>

      <style>{`
        @keyframes posterIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
};

export default ResultView;
