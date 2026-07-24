import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateDarkTriadResult, darkTriadTestQuestions } from '../utils/darkTriadLogic';

export default function DarkTriadTest() {
  return (
    <QuestionnaireRunner
      questions={darkTriadTestQuestions}
      questionsPerPage={6}
      loadingTitle="Compiling Shadow Profile"
      spinnerColor="border-t-zinc-800"
      calculateResult={(answersArray) => calculateDarkTriadResult(answersArray)}
      getRedirectPath={(result) => `/result/dark-triad/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is an educational screening tool based on the Short Dark Triad (SD3) research model and does not constitute a clinical diagnosis."
    />
  );
}
