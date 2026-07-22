import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateImposterResult, imposterTestQuestions } from '../utils/imposterLogic';

export default function ImposterTest() {
  return (
    <QuestionnaireRunner
      questions={imposterTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing the Inner Critic"
      loadingSubtitle="Evaluating competency scripts"
      spinnerColor="border-t-fuchsia-600"
      calculateResult={(answersArray) => calculateImposterResult(answersArray)}
      getRedirectPath={(result) => `/result/imposter/${result.fullTitle}`}
      disclaimer="Disclaimer: This assessment is an educational tool based on the Clance Impostor Phenomenon Scale (CIPS) research framework and does not constitute a formal diagnostic evaluation."
    />
  );
}
