import 'regenerator-runtime';

const fetch = require('node-fetch');

const createGame = async () => {
  const game = {
    name: 'platform-game-js-webpack-phaser',
  };
  const post = JSON.stringify(game);
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const result = await response.json();
   
  console.log(result);
  return result;
};

const postScore = async (name, score) => {
  const submit = {
    user: name,
    score,
  };
  const post = JSON.stringify(submit);
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/X4MZpnLhao9CRDCjE1sE/scores/';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const result = await response.json();
  return result;
};

const sorting = (obj) => {
  const array = [];
  for (let i = 0; i < obj.length; i += 1) {
    array.push([obj[i].score, obj[i].user]);
  }
  return Array.from(array).sort((a, b) => b[0] - a[0]);
};

const getScores = async () => {
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/X4MZpnLhao9CRDCjE1sE/scores/';
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(address, settings);
  const answer = await response.json();
  return sorting(answer.result);
};


export {
  createGame, postScore, getScores 
};