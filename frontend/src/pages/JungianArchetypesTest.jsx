import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateJungianResult, jungianQuestions } from '../utils/jungianArchetypesLogic';

export default function JungianArchetypesTest() {
  return (
    <QuestionnaireRunner
      questions={jungianQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      progressGradient="from-blue-500 to-indigo-500"
      calculateResult={(answersArray) => calculateJungianResult(answersArray)}
      getRedirectPath={(result) => `/result/jungian-archetypes/${result.primaryInfo.id}`}
    />
  );
}
