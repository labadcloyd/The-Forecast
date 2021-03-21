function Navbar(){
    return(
        <div class={"header"}>
            <div class={"header-container"}>
                <a href="/" class="title">
                    <img src="img/site-logo.png" alt="" class={"site-logo"} />
                    <div class={"site-title main"}>The Forecast</div> 
                </a>
                <div class={"searchContainer"}>
                    <form action="/getWeather" method="POST" id="search-form">
                        <input name="citySearch" class={"searchbar"} placeholder="Enter The Location" />
                        <button type="submit" class={"search"}><span class={"material-icons"}>search</span></button>
                    </form>
                </div>   
            </div>
        </div>
    )
}
export default Navbar;