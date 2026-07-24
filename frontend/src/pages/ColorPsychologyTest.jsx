import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { colorPsychologyQuestions, calculateColorPsychology } from '../utils/colorPsychologyLogic';

export default function ColorPsychologyTest() {
  return (
    <QuestionnaireRunner
      questions={colorPsychologyQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      progressGradient="from-cyan-500 to-blue-500"
      calculateResult={(_, simpleAnswersMap) => calculateColorPsychology(simpleAnswersMap)}
      getRedirectPath={(result) => `/result/color-psychology/${result.dominantArchetype}`}
    />
  );
}
