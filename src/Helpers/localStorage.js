const initSaveLocal = () => {
  localStorage.setItem("name", "anonymous");
  localStorage.setItem("score", 0);
};

const saveLocalName = (name) => {
  localStorage.setItem('name', name);
};

const saveLocalScore = (score) => {
  localStorage.setItem('score', parseInt(score, 10));
};

const getLocalName = () => {
  const name = localStorage.getItem('name');
  if (name === null) { localStorage.setItem("name", "anonymous"); }
  return name;
};

const getLocalScore = () => {
  const score = parseInt(localStorage.getItem('score'), 10);
  if (score == 0) { localStorage.setItem("score", 0); }
  return score;
};

export {
  initSaveLocal, saveLocalName, saveLocalScore, getLocalName, getLocalScore
};
