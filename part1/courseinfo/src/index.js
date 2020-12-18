import React from 'react';
import ReactDOM from 'react-dom';

const Part = (props) => {
  return (
    <p> {props.courseDetail.name} {props.courseDetail.exercise} </p>
  )
}
const Course = (props) => {
  return(
      <h1> {props.coursename} </h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part courseDetail = {props.courseDetail[0]} />
      <Part courseDetail = {props.courseDetail[1]} />
      <Part courseDetail = {props.courseDetail[2]} />
    </div>
  )    
}

const Total = (props) => {
  return(
  <>
    <p> Number of exercises {props.courseDetail[0].exercise +  props.courseDetail[1].exercise + props.courseDetail[2].exercise} </p>  
  </>)
}
const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercise: 10,
      } , 
      {
        name: 'Using props to pass data',
        exercise: 7,
      } , 
      {
        name: 'State of a component',
        exercise: 14,
      },
    ]
  }

  return (
    <>
      <Course coursename= {course.name} />
      <Content courseDetail= {course.parts} />
      <Total courseDetail = {course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
