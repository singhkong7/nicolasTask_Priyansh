// import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function App() {
  const questions = [
    {
      number: "Question 1",
      question_info: "AreaUnderTheCurve_901"
    },
    {
      number: "Question 2",
      question_info: "BinomialTheorem_901"
    },
    {
      number: "Question 3",
      question_info: "DifferentialCalculus2_901"
    }
  ];
  const [selectedQuestion, setSelectedQuestion] = useState(
    "AreaUnderTheCurve_901"
  );
  const [questionDetail, setQuestionDetail] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID`,
        { params: { QuestionID: selectedQuestion } }
      )
      .then((response) => {
        console.log(response.data?.[0]?.Question);
        setQuestionDetail(response.data?.[0]?.Question);
      })
      .catch((err) => console.log(err));
  }, [selectedQuestion]);
  return (
    <div className="App">
      <h2>Mathematical Questions</h2>
      <div className="question_list">
        {questions?.map((item, key) => (
          <div
            className="question_box"
            style={{
              backgroundColor:
                selectedQuestion === item.question_info ? "lightblue" : "white",
              color: selectedQuestion === item.question_info ? "red" : "black"
            }}
            onClick={() => {
              setSelectedQuestion(item.question_info);
            }}
          >
            <p>{item.number}</p>
            <p>{item.question_info}</p>
          </div>
        ))}
      </div>
      <div className="mathjax_question">
        <MathJaxContext>
          <MathJax>{questionDetail}</MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
}
