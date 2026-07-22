import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { moralAlignmentQuestions, calculateMoralAlignment } from '../utils/moralAlignmentLogic';

export default function MoralAlignmentTest() {
  return (
    <QuestionnaireRunner
      questions={moralAlignmentQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      progressGradient="from-emerald-500 to-teal-500"
      calculateResult={(answersArray) => calculateMoralAlignment(answersArray)}
      getRedirectPath={(result) => `/result/alignment/${result.alignment.id}`}
    />
  );
}
