import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateTritypeResult, tritypeTestQuestions } from '../utils/tritypeResultLogic';

export default function TritypeTest() {
  return (
    <QuestionnaireRunner
      questions={tritypeTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      calculateResult={(answersArray) => calculateTritypeResult(answersArray)}
      getRedirectPath={(result) => `/result/tritype/${result.archetypeKey}`}
    />
  );
}
