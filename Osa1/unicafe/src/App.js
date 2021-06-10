import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (sentiment, setSentiment) => () => setSentiment(sentiment + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" handleclick={addFeedback(good, setGood)}/>
        <Button text="neutral" handleclick={addFeedback(neutral, setNeutral)}/>
        <Button text="bad" handleclick={addFeedback(bad, setBad)}/>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({text, handleclick}) => (
  <button onClick={handleclick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  
  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positivePercent = good / (good + neutral + bad) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positivePercent + " %"} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default App