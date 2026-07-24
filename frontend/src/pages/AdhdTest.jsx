import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateAdhdResult, adhdTestQuestions } from '../utils/adhdLogic';

export default function AdhdTest() {
  return (
    <QuestionnaireRunner
      questions={adhdTestQuestions}
      questionsPerPage={6}
      leftLabel="Never"
      rightLabel="Very Often"
      spinnerColor="border-t-orange-500"
      progressGradient="from-orange-500 to-rose-500"
      calculateResult={(answersArray) => calculateAdhdResult(answersArray)}
      getRedirectPath={(result) => `/result/adhd/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is a screening tool based on the ASRS v1.1 and does not constitute a clinical diagnosis. Please consult a medical professional for a comprehensive evaluation."
    />
  );
}
