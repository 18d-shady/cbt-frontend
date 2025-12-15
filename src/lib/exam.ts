import api from "./api";

// Fetch exam details
export async function getExamDetail(courseCode: string) {
  const res = await api.get(`/api/exam/${courseCode}/`);
  return res.data;
}

// Get question by index
export async function getQuestionByIndex(courseCode: string, index: number) {
  const res = await api.get(`/api/exam/${courseCode}/question/${index}/`);
  return res.data;
}

// Save student answer
export async function saveAnswer(questionId: number, selectedOption: string) {
  const res = await api.post("/api/answer/", {
    questionId,
    selectedOption,
  });
  return res.data;
}


// Remaining time
export async function getRemainingTime(courseCode: string) {
  const res = await api.get(`/api/exam/${courseCode}/time/`);
  return res.data;
}

// End exam session (submit)
export async function endExamSession(courseCode: string) {
  const res = await api.post(`/api/exam/${courseCode}/end/`);
  return res.data;
}
