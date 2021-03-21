import Image from 'next/image'
function Navbar(){
    return(
        <div className={"header"}>
            <div className={"header-container"}>
                <a href="/" className="title">
                    <Image src={"/../public/site-logo.png"} alt="" className={"site-logo"}  width={'35px'} height={'35px'}/>
                    <div class={"site-title main"}>The Forecast</div> 
                </a>
                <div className={"searchContainer"}>
                    <form action="/getWeather" method="POST" id="search-form">
                        <input name="citySearch" className={"searchbar"} placeholder="Enter The Location" />
                        <button type="submit" className={"search"}><span className={"material-icons"}>search</span></button>
                    </form>
                </div>   
            </div>
        </div>
    )
}
export default Navbar;