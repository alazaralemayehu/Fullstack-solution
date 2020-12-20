import { React } from "react";
// Given the course calculat total amount of exercises
// Uses map function by initializing sum to be zero in 
// it adds the amount of exercise for each part to sum
const Total = ({ course }) => {
    const parts = course.parts
    const total  = parts.reduce((sum, part) => {
      return sum + part.exercises
    },0)
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  // Extracts course parts from course
  // uses map to create Part Component from course
  const Content = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        {parts.map(part => <Part part={part} />)}
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course