
import { QuizQuestion, HorseTypeKey, HorseTypeInfo, SquareCard } from './types';

export const QUESTIONS: QuizQuestion[] = [
  { id: 'Q1', text: '凌晨 1 点，领导在群里发奋斗鸡汤，你会立刻回表情包点赞吗？', hint: '指尖的颤抖是职场的尊严' },
  { id: 'Q2', text: '开会没人认领失误，你会因为受不了沉默而主动跳出来“复盘”吗？', hint: '沉默不是金，是尴尬的深渊' },
  { id: 'Q3', text: '同事理所当然地让你顺手取快递/改文档，你会笑着接过来吗？', hint: '顺手的一小步，卑微的一大步' },
  { id: 'Q4', text: '目睹同事靠拍马屁抢走你的功劳，你还能对着他点头微笑吗？', hint: '微笑是面具，内心在蹦迪' },
  { id: 'Q5', text: '如果公司明天取消厕纸和加班餐，你会为了保住工作默默接受吗？', hint: '生存还是生活，这是一个括约肌问题' },
];

export const HORSE_RESULTS: Record<HorseTypeKey, HorseTypeInfo> = {
  ZEBRA: { 
    name: '班马', 
    desc: '一只上着普通版的普通马，\n略懂一点人性', 
    image: '🦓' 
  },
  KISS_ASS: { 
    name: '马屁', 
    desc: '不是我在拍\n是我的手\n忍不住为领导鼓掌', 
    image: '🐴' 
  },
  DAMN_HORSE: { 
    name: '踏马', 
    desc: '每天都在问候TM，\n但消息从未发出', 
    image: '😠' 
  },
  HAJIMA: { 
    name: '哈吉马', 
    desc: '这我不干，\n不是我的锅，\n哈吉嘛！！！', 
    image: '🚫' 
  },
  KING_HORSE: { 
    name: '黄阿马', 
    desc: '架子这么大，\n官一定也很大吧？', 
    image: '🤴' 
  },
  MULE_HORSE: { 
    name: '骡马', 
    desc: '条条大路通罗马，\n但骡马，狗屁不通', 
    image: '🧱' 
  },
  COLLECTION_HORSE: { 
    name: '收款马', 
    desc: '什么都不想干\n只想坐着收款', 
    image: '💰' 
  },
  MARRY_GO_ROUND: { 
    name: '旋转木马', 
    desc: '虽然每天都在忙，\n但原地踏步的\n姿势很优美', 
    image: '🎠' 
  },
};

export const SQUARE_DATA: SquareCard[] = [
  { id: '1', type: 'RANT', content: 'PPT做了一整天，老板说：第一版挺好的，要不还是用第一版吧。', author: '秃头小王', tag: '破口大马' },
  { id: '2', type: 'FODDER', content: '如何在不离职的前提下，体面地屏蔽所有同事的朋友圈？', author: '透明人', tag: '电子草料' },
];
