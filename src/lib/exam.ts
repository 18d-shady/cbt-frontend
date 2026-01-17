import api from "./api";

// Fetch exam details
export async function getExamDetail(examId: number) {
  const res = await api.get(`/api/exam/${examId}/`);
  return res.data;
}

// Get question by index
export async function getQuestionByIndex(examId: number, index: number) {
  const res = await api.get(`/api/exam/${examId}/question/${index}/`);
  return res.data;
}

// Save student answer
export async function saveAnswer(questionId: number, answerText: string) {
  const res = await api.post("/api/answer/", {
    questionId,
    selectedOption: answerText
  });
  return res.data;
}


// Remaining time
export async function getRemainingTime(examId: number) {
  const res = await api.get(`/api/exam/${examId}/time/`);
  return res.data;
}

// End exam session (submit)
export async function endExamSession(examId: number) {
  const res = await api.post(`/api/exam/${examId}/end/`);
  return res.data;
}
