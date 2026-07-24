import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateInstinctualResult, instinctualTestQuestions } from '../utils/instinctualVariantsLogic';

export default function InstinctualVariantsTest() {
  return (
    <QuestionnaireRunner
      questions={instinctualTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      calculateResult={(answersArray) => calculateInstinctualResult(answersArray)}
      getRedirectPath={(result) => `/result/instinctual-variants/${result.info.id}`}
    />
  );
}
