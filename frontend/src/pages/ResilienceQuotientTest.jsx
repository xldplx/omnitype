import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { rqQuestions, calculateRQ } from '../utils/resilienceQuotientLogic';

export default function ResilienceQuotientTest() {
  return (
    <QuestionnaireRunner
      questions={rqQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      progressGradient="from-indigo-500 to-violet-500"
      calculateResult={(answersArray) => calculateRQ(answersArray)}
      getRedirectPath={(result) => `/result/resilience/${result.rqInfo.id}`}
    />
  );
}
