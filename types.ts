export type Language = 'ar' | 'fr';

export interface Option {
  id: string;
  textAr: string;
  textFr: string;
  labelAr: string;  // For admin panel display
  labelFr: string;  // For admin panel display
}

export interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  questionAr: string;
  questionFr: string;
  options?: Option[];
}

export interface Section {
  id: string;
  titleAr: string;
  titleFr: string;
  questions: Question[];
}

export interface SurveyData {
  intro: {
    titleAr: string;
    titleFr: string;
    bodyAr: string;
    bodyFr: string;
  };
  sections: Section[];
  outro: {
    titleAr: string;
    titleFr: string;
    bodyAr: string;
    bodyFr: string;
  };
}