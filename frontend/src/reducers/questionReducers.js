export function questionListReducer(state = { questions: [] }, action) {
  if (action.type === "QUESTION_LIST_REQUEST") {
    return { loading: true, questions: [] };
  } else if (action.type === "QUESTION_LIST_SUCCESS") {
    return { loading: false, questions: action.payload };
  } else if (action.type === "QUESTION_LIST_FAIL") {
    return { loading: false, error: action.payload };
  } else return state;
}
