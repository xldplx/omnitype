import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateEnneagramResult, enneagramTestQuestions } from '../utils/enneagramResultLogic';

export default function EnneagramTest() {
  return (
    <QuestionnaireRunner
      questions={enneagramTestQuestions}
      shuffleQuestions={true}
      questionsPerPage={6}
      loadingTitle="Calculating Enneagram Profile"
      loadingSubtitle="Mapping your core motivations, centers of intelligence, and wing dynamics..."
      calculateResult={(answersArray, simpleAnswersMap, questions) =>
        calculateEnneagramResult(answersArray, simpleAnswersMap, questions)
      }
      getRedirectPath={(result) => `/result/enneagram/${result.fullTitle}`}
      transformState={(result) => ({ resultData: result })}
    />
  );
}
