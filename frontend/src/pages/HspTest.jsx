import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateHspResult, hspTestQuestions } from '../utils/hspLogic';

export default function HspTest() {
  return (
    <QuestionnaireRunner
      questions={hspTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Sensory Data"
      spinnerColor="border-t-pink-500"
      calculateResult={(answersArray) => calculateHspResult(answersArray)}
      getRedirectPath={(result) => `/result/hsp/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is a screening tool based on the HSPS framework (Aron & Aron, 1997) and does not constitute a clinical diagnosis."
    />
  );
}
