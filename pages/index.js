import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInput] = useState('')
  const locationUrl = `/weather/${inputValue}`;
  function handleChange(event){
    setInput(event.target.value)
  }
  let currentYear = new Date().getFullYear();
  return (
    <div className={'home'} style={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'3rem'}}>
      <Head>
        <title>The Forecast</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>     
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <a href="/" className="title" style={{margin:'-60px 20px 0px 20px'}}>
          <Image src={"/../public/site-logo.png"} alt="" className={"site-logo"}  width={'70px'} height={'70px'}/>
          <div  class={"site-title main"} style={{color:'white', fontSize:'3rem'}}>The Forecast</div> 
      </a>
      <div className={"search-container"} >
        <form method='POST' action={locationUrl} style={{display:'flex', flexDirection:'row', margin:'0px 20px 0px 20px'}}>
          <input type='text' className={"searchbar"} name='location' value={inputValue} onChange={handleChange} placeholder='Enter Location' autoComplete={'off'} style={{backgroundColor:'rgba(0,0,0,0.2)', backdropFilter:'blur(10px)', fontSize:'1.4rem', color:'white'}} />
          <button type='submit' className={"search"} style={{backgroundColor:'rgba(0,0,0,0.2)', backdropFilter:'blur(10px)'}}><span className={"material-icons"} style={{color:'white'}}>search</span></button>
        </form>
      </div>
      <div class="credits" style={{color:'white', position:'absolute', bottom:'20px'}}>
          <span>© {currentYear} Code and Design by: <a href="https://github.com/labadcloyd">Cloyd Abad</a></span>
          <span>
              Site powered by 
              <a href="https://openweathermap.org/"> openweathermap.org </a> 
              &
              <a href="https://locationiq.com/"> locationiq.com </a>
          </span> 
      </div>
    </div>
  )
}
