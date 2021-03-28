import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInput] = useState('')
  const locationUrl = `/weather/${inputValue}`;
  function handleChange(event){
    setInput(event.target.value)
  }
  return (
    <div className={'home'} style={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'3rem'}}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <a href="/" className="title" style={{marginTop:'-60px'}}>
          <Image src={"/../public/site-logo.png"} alt="" className={"site-logo"}  width={'70px'} height={'70px'}/>
          <div class={"site-title main"} style={{color:'white', fontSize:'3rem'}}>The Forecast</div> 
      </a>
      <div className={"search-container"}>
        <form method='POST' action={locationUrl} style={{display:'flex', flexDirection:'row'}}>
          <input type='text' className={"searchbar"} name='location' value={inputValue} onChange={handleChange} style={{backgroundColor:'rgba(0,0,0,0.2)', backdropFilter:'blur(10px)', fontSize:'1.4rem', color:'white'}} placeholder='Enter Location'/>
          <button type='submit' className={"search"} style={{backgroundColor:'rgba(0,0,0,0.2)', backdropFilter:'blur(10px)'}}><span className={"material-icons"} style={{color:'white'}}>search</span></button>
        </form>
      </div>
    </div>
  )
}
