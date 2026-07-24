import QuestionnaireRunner from '../components/QuestionnaireRunner';
import { calculateAttachmentResult, attachmentTestQuestions } from '../utils/attachmentStylesLogic';

export default function AttachmentStylesTest() {
  return (
    <QuestionnaireRunner
      questions={attachmentTestQuestions}
      questionsPerPage={6}
      loadingTitle="Analyzing Results"
      calculateResult={(answersArray) => calculateAttachmentResult(answersArray)}
      getRedirectPath={(result) => `/result/attachment-styles/${result.info.id}`}
    />
  );
}
