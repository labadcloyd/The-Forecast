import Image from 'next/image'
function Footerbar(){
    return(
        <div class="footer-bar">
            <div class="wrapper">
                <div class="footer-wrapper">
                    <a href="/" class="title footer">
                        <Image src={"/../public/site-logo.png"} alt="" className={"site-logo"}  width={'35px'} height={'35px'}/>
                        <div class="site-title footer">The Forecast</div> 
                    </a>
                    <div class="credits">
                        <span>© Cloyd Abad</span>
                        <span>
                            Site powered by 
                            <a href="https://openweathermap.org/"> openweathermap.org </a> 
                            &
                            <a href="https://locationiq.com/"> locationiq.com </a>
                        </span> 
                    </div>
                </div>
            </div>
        </div>
    )   
}
export default Footerbar;