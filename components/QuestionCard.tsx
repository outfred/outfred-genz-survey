import React from 'react';
import { Question, Language } from '../types';

interface QuestionCardProps {
  question: Question;
  language: Language;
  selectedOption: string | null;
  onSelect: (questionId: string, optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  language,
  selectedOption,
  onSelect,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="mb-8 glass-panel rounded-xl p-6 shadow-sm transition-all hover:shadow-md animate-fadeIn">
      <h3 className={`mb-4 text-xl font-bold leading-relaxed ${isAr ? 'font-arabic' : 'font-sans'}`}>
        {isAr ? question.questionAr : question.questionFr}
      </h3>

      <div className="space-y-3">
        {question.type === 'text' ? (
          <input
            type="text"
            value={selectedOption || ''}
            onChange={(e) => onSelect(question.id, e.target.value)}
            placeholder={isAr ? 'اكتب إجابتك هنا...' : 'Type your answer here...'}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-arabic"
          />
        ) : (
          question.options?.map((option) => (
            <label
              key={option.id}
              className={`group flex cursor-pointer items-center rounded-lg border border-transparent p-3 transition-all hover:bg-secondary/50 ${selectedOption === option.id
                  ? 'bg-secondary/70 border-primary/30 ring-1 ring-primary/50'
                  : 'bg-card/30'
                }`}
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-muted-foreground/40 group-hover:border-primary">
                <div
                  className={`h-2.5 w-2.5 rounded-full bg-primary transition-transform duration-200 ${selectedOption === option.id ? 'scale-100' : 'scale-0'
                    }`}
                />
              </div>
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => onSelect(question.id, option.id)}
                className="hidden"
              />
              <span
                className={`ms-3 text-base ${selectedOption === option.id ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  } ${isAr ? 'font-arabic' : 'font-sans'}`}
              >
                {isAr ? option.textAr : option.textFr}
              </span>
            </label>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionCard;