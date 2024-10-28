const Course = ({course}) => {

    const Header = () => {
      return <h1>{course.name}</h1>
    }
  
    const Content = () => {
      return(
        <>
         {course.parts.map(part => (
          <p key={part.id}> 
            {part.name} {part.exercises}
          </p>
        ))}
        </>
      )
    }
  
    const Total = () => {
      let sum = course.parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
      }, 0);
  
      return(
        <p>Total of {sum} exercises</p>
      )
    }
    
    
    return(
      <> 
        <Header/>
        <Content/> 
        <Total/>
      </>
    )
  }

export default Course;