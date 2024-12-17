import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [categories, setCategories] = useState([]); // Stores trivia categories
  const [questions, setQuestions] = useState([]); // Stores fetched questions
  const categoryEl = useRef();
  const amountEl = useRef();

  // Fetch trivia categories on component mount
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []); // Run only once

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Fetch trivia questions based on user input
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: (amountEl.current.value),
          category: (categoryEl.current.value),
        },
      })
      .then(res => {
        setQuestions(res.data.results); // Update state with questions
      })
      .catch(err => {
        console.error('Error fetching questions:', err);
      });
  }


  return (
    <div>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      {/* Render questions */}
      {questions.length > 0 && (
        <div className="questions">
          <h2>Questions:</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
