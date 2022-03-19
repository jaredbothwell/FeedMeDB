import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import AnimatedPage from './AnimatedPage'
import './css_files/Home.css'
import Search from '../components/SearchBar'

export default function Home() {

  const [testLabel,setLabel] = useState('')

  return (
    <AnimatedPage>
    <section className='home--search'>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 style={{marginTop: '20px'}}  className='label'>Look up a recipe</h1>
        </div>
        <div style={{marginTop: '20px'}} className='row justify-content-center'>
          <div>
            <Search/>
            {/* 
            <Form >
              <Form.Group>
                <Form.Control type="search" placeholder='Search...' onChange={e=>setLabel(e.target.value)}/>
              </Form.Group>
            </Form>
            */}
          </div>
        </div >
        <div className='row justify-content-center'>
          <label>{testLabel}</label>
        </div>
        
       </div>
    </section>

    </AnimatedPage>
  )
}