import Image from 'next/image'
import { useState } from 'react'

function Navbar(){
    const [inputValue, setInput] = useState('');
    const locationUrl = `/weather/${inputValue}`;
    function handleChange(event){
        setInput(event.target.value)
    }
    return(
        <div className={"header"}>
            <div className={"header-container"}>
                <a href="/" className="title">
                    <Image src={"/../public/site-logo.png"} alt="" className={"site-logo"}  width={'35px'} height={'35px'}/>
                    <div class={"site-title main"}>The Forecast</div> 
                </a>
                <div className={"search-container"}>
                    <form action={locationUrl} method="POST" id="search-form">
                        <input name="citySearch" className={"searchbar"} placeholder="Enter The Location" onChange={handleChange} value={inputValue}/>
                        <button type="submit" className={"search"}><span className={"material-icons"}>search</span></button>
                    </form>
                </div>   
            </div>
        </div>
    )
}
export default Navbar;