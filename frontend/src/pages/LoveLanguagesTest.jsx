import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateLoveLanguagesResult, loveLanguagesTestQuestions } from '../utils/loveLanguagesLogic';

export default function LoveLanguagesTest() {
  return (
    <QuestionnaireRunner
      questions={loveLanguagesTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      calculateResult={(answersArray) => calculateLoveLanguagesResult(answersArray)}
      getRedirectPath={(result) => `/result/love-languages/${result.info.id}`}
    />
  );
}
