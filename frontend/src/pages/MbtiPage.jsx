import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateMBTI, mbtiQuestions } from '../utils/mbtiResultLogic';

export default function MbtiPage() {
  return (
    <QuestionnaireRunner
      questions={mbtiQuestions}
      questionsPerPage={5}
      loadingTitle="Analyzing Results"
      calculateResult={(_, simpleAnswersMap, questions) => calculateMBTI(simpleAnswersMap, questions)}
      getRedirectPath={(result) => `/result/mbti/${result.type.toLowerCase()}`}
      transformState={(result) => ({ percentages: result.percentages })}
    />
  );
}
