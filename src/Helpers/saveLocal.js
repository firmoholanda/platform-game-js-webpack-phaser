const saveLocal = (name, score) => {
  localStorage.setItem('name', name);
  localStorage.setItem('score', score);
};

const getLocal = () => {
  const name = localStorage.getItem('name');
  const score = localStorage.getItem('score');
  
  if (name === null) { localStorage.setItem("name", "anonymous"); }
  if (score === null) { localStorage.setItem("score", 0); }

  return name, score;
};

export {
  saveLocal, getLocal
};
