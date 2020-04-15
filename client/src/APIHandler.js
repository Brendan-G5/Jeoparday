const BASE_URL = "http://jservice.io/api";

async function getQuestions() {
  const randomQuestion = await fetchRequest("/random");
  const questions = await fetchRequest(
    `/category/?id=${randomQuestion[0].category_id}`
  );
  const questionList = questions.clues;
  const questionsToGo = [];
  const takenID = [];
  questionList.forEach(function (Q) {
    if (Q.invalid_count === null && !takenID.includes(Q.id)) {
      questionsToGo.push(Q);
      takenID.push(Q.id)
    }
  });


  if (questionsToGo.length >= 5) {
    shuffleArray(questionsToGo);
    const finalQs = questionsToGo.slice(0, 5);
    const dailyObj = {
      title: questions.title,
      date: Date.now(),
      result: 0
    };
    return [dailyObj, finalQs];
  } else {
    getQuestions();
  }
}

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status <= 400 ? res.json() : Promise.reject(res)))
    .catch((err) => {
      console.log(err);
      console.log("error during fetch request");
    });
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

module.exports = getQuestions;
