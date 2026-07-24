import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateEnneagramResult, enneagramTestQuestions } from '../utils/enneagramResultLogic';

export default function EnneagramTest() {
  return (
    <QuestionnaireRunner
      questions={enneagramTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      calculateResult={(answersArray) => calculateEnneagramResult(answersArray)}
      getRedirectPath={(result) => `/result/enneagram/${result.fullTitle}`}
    />
  );
}
