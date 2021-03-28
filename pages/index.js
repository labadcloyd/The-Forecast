import Head from 'next/head';
import { useState } from 'react';
import background from '../public/homeWallpaper.jpg';

export default function Home() {
  const [inputValue, setInput] = useState('')
  const locationUrl = `/weather/${inputValue}`;
  function handleChange(event){
    setInput(event.target.value)
  }
  return (
    <div style={{backgroundImage: `url("${background}")`, backgroundColor:'black', height: '100vh'}}>
      <form method='POST' action={locationUrl}>
        <label htmlFor='location'></label>
        <input type='text' name='location' value={inputValue} onChange={handleChange}/>
        <input type='submit'/>
      </form>
    </div>
  )
}
