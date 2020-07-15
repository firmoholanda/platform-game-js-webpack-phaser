const saveLocal = (score) => {
  const answer = JSON.stringify(score);
  localStorage.setItem('score', answer);
};

const getLocalScore = () => {
  const answer = localStorage.getItem('score');
  let result = JSON.parse(answer);
  if (result === null) {
    result = 0;
    saveLocal(result);
  }
  return result;
};

const saveLocalScore = (score) => {
  saveLocal(score);
};

export {
  saveLocal, saveLocalScore, getLocalScore,
};
