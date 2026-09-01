import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateMBTI, mbtiQuestions } from '../utils/mbtiResultLogic';

export default function MbtiPage() {
  return (
    <QuestionnaireRunner
      questions={mbtiQuestions}
      questionsPerPage={6}
      loadingTitle="Calculating Cognitive Profile"
      loadingSubtitle="Mapping your 4 Jungian dichotomies and cognitive architecture..."
      calculateResult={(_, simpleAnswersMap, questions) => calculateMBTI(simpleAnswersMap, questions)}
      getRedirectPath={(result) => `/result/mbti/${result.type.toLowerCase()}`}
      transformState={(result) => ({ percentages: result.percentages })}
    />
  );
}
