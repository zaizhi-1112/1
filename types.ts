
export type HorseTypeKey = 
  | 'MARRY_GO_ROUND' 
  | 'COLLECTION_HORSE' 
  | 'KISS_ASS' 
  | 'HAJIMA' 
  | 'DAMN_HORSE' 
  | 'KING_HORSE' 
  | 'MULE_HORSE' 
  | 'ZEBRA';

export interface HorseTypeInfo {
  name: string;
  desc: string;
  image: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  hint: string;
}

export interface SquareCard {
  id: string;
  type: 'RANT' | 'FODDER';
  content: string;
  author: string;
  tag: string;
}
