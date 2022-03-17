import React, { useState, useEffect } from "react";

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
      <>
        {/* using ternery operator as an if statement */}
        { dataIsLoaded ? <div className="App">
        <h1 style={{textAlign: 'center'}}> Fetch data from an api in react </h1>  {
          items.map((item) => (
            <ol style={{textAlign: 'center'}} key={item.id} >
              id: {item.id},
              name: {item.name},
              hash: {item.passwordHash}
            </ol>
          ))
        
        }
      </div>:<h1>data did not load</h1>
        }
      </>
    )
}
