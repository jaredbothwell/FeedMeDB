import React, { useState, useEffect } from "react";
import AnimatedPage from "./AnimatedPage";

export default function Test ()
{

    // using react hooks to create state vars
  const [items, setItems] = useState([])
  const [dataIsLoaded, setIsLoaded] = useState(false)

  // this replaces the componentDidMount
  useEffect(()=>
  {
    fetch(
      "http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoaded(true);
      })
  }, [])
    return(
      <AnimatedPage>
        {/* using ternery operator as an if statement */}
        { dataIsLoaded ? <div className="App">
        <h1 style={{textAlign: 'center'}}> Fetch data from an api in react </h1>  
        <ol style={{textAlign: 'center'}}  >{
          items.map((item) => (
            
              <li key={item.id} >
                id: {item.id},
                name: {item.name},
                hash: {item.passwordHash}
              </li>
            
          ))
        
        }
        </ol>
      </div>:<h1>data did not load</h1>
        }
      </AnimatedPage>
    )
}
