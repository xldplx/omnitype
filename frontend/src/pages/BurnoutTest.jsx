import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateBurnoutResult, burnoutTestQuestions } from '../utils/burnoutLogic';

export default function BurnoutTest() {
  return (
    <QuestionnaireRunner
      questions={burnoutTestQuestions}
      questionsPerPage={6}
      calculateResult={(answersArray) => calculateBurnoutResult(answersArray)}
      getRedirectPath={(result) => `/result/burnout/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is an educational tool based on established burnout research models (e.g. MBI concepts) and does not constitute a clinical diagnosis."
    />
  );
}
