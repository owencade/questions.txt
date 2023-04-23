const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const questionsURL = 'https://raw.githubusercontent.com/owencade/questions.txt/main/questions.txt';

// Middleware to parse POST request body
app.use(bodyParser.urlencoded({ extended: true }));

// Set public directory as static
app.use(express.static(path.join(__dirname, 'public')));

// GET route to render index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET route to fetch questions from GitHub and send as JSON response
app.get('/questions', async (req, res) => {
  const response = await fetch(questionsURL);
  const data = await response.text();
  const questions = data.split('\n').map(question => question.trim());
  res.json(questions);
});

// POST route to add new question to questions.txt
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    res.status(400).send('Question cannot be empty');
    return;
  }
  const response = await fetch(questionsURL, {
    method: 'POST',
    body: question + '\n'
  });
  const data = await response.text();
  res.redirect('/');
});

// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
