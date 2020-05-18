const BASE_URL = 'https://jservice.io/api';

async function getQuestions() {
  const randomQuestion = await fetchRequest('/random');
  const questions = await fetchRequest(
    `/category/?id=${randomQuestion[0].category_id}`
  );
  const questionList = questions.clues;
  const questionsToGo = [];
  const takenAnswer = [];
  questionList.forEach(function (Q) {
    if (
      Q.invalid_count === null &&
      !takenAnswer.includes(Q.answer) &&
      !Q.question.toLowerCase().includes('seen here') &&
      Q.question &&
      Q.answer
    ) {
      questionsToGo.push(Q);
      takenAnswer.push(Q.answer);
    }
  });

  if (questionsToGo.length >= 5) {
    shuffleArray(questionsToGo);
    const finalQs = questionsToGo.slice(0, 5).map((el) => {
      let val = Object.assign({}, el);
      val.reveal = null;
      return val;
    });
    const dailyObj = {
      title: questions.title,
      date: Date.now(),
      result: 0,
    };
    console.log(finalQs)
    return [dailyObj, finalQs];
  } else {
    getQuestions();
  }
}

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status <= 400 ? res.json() : Promise.reject(res)))
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
      console.log('error during fetch request'); // eslint-disable-line no-console
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

export default getQuestions;
