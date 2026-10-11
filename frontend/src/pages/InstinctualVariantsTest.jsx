import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateInstinctualResult, instinctualTestQuestions } from '../utils/instinctualVariantsLogic';

export default function InstinctualVariantsTest() {
  return (
    <QuestionnaireRunner
      questions={instinctualTestQuestions}
      shuffleQuestions={true}
      questionsPerPage={6}
      loadingTitle="Calculating Instinctual Stacking"
      loadingSubtitle="Mapping your survival drives, relational focus, and blindspot..."
      calculateResult={(answersArray, simpleAnswersMap, questions) =>
        calculateInstinctualResult(answersArray, simpleAnswersMap, questions)
      }
      getRedirectPath={(result) => `/result/instinctual-variants/${result.info.id}`}
      transformState={(result) => ({ resultData: result })}
    />
  );
}
