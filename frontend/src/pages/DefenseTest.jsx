import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateDefenseResult, defenseTestQuestions } from '../utils/defenseLogic';

export default function DefenseTest() {
  return (
    <QuestionnaireRunner
      questions={defenseTestQuestions}
      questionsPerPage={6}
      loadingTitle="Deconstructing Defenses"
      loadingSubtitle="Mapping anxiety shields"
      spinnerColor="border-t-sky-600"
      calculateResult={(answersArray) => calculateDefenseResult(answersArray)}
      getRedirectPath={(result) => `/result/defense/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is an educational self-exploration tool based on psychodynamic defense mechanism models (e.g. DSQ concepts) and does not constitute a clinical diagnosis."
    />
  );
}
