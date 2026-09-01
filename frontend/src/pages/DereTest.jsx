import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateDereResult, dereQuestions } from '../utils/dereLogic';

export default function DereTest() {
  return (
    <QuestionnaireRunner
      questions={dereQuestions}
      questionsPerPage={5}
      loadingTitle="Mapping Dere Archetype Spectrum"
      loadingSubtitle="Analyzing behavioral defenses, intimacy rhythms, and affection profiles..."
      progressGradient="from-rose-500 via-purple-500 to-indigo-500"
      calculateResult={(answersArray) => calculateDereResult(answersArray)}
      getRedirectPath={(result) => `/result/dere/${result.primaryType.id}`}
    />
  );
}
