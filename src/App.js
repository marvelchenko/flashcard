import { useState, useEffect } from 'react';
import './App.css';
import FlashCardList from './components/FlashCardList';
// import { SAMPLE_FLASHCARDS } from './components/QuestionBanks';
import axios from 'axios';
import Header from './components/Header';

function App() {
  const [flashcards, setFlashCards] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy');
        setFlashCards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map(a => decodeString(a)), 
              answer];
            return {
              id: `${index}-${Date.now()}`, // Use Date.now() for unique ID
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      } catch (err) {
        if (err.response?.status === 429) {
          console.error('Rate limited. Retrying in 5 seconds...');
          setTimeout(fetchData, 5000); // Retry after 5 seconds
        } else {
          console.error('Error fetching data:', err); // Log any other errors
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once // Empty dependency array ensures this runs only once
  
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  return (
    <>
    <Header />
    <div className="container">
      <FlashCardList flashcards={flashcards} />
    </div>
    </>
  );
}



export default App;
