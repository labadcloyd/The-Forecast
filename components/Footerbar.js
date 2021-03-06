import Image from "next/image";
function Footerbar() {
  let currentYear = new Date().getFullYear();
  return (
    <div className='footer-bar'>
      <div className='wrapper'>
        <div className='footer-wrapper'>
          <a href='/' className='title footer'>
            <Image
              src={`/../public/site-logo2.png`}
              alt=''
              className={"site-logo"}
              width={"35px"}
              height={"35px"}
            />
            <div className='site-title footer'>The Forecast</div>
          </a>
          <div className='credits'>
            <span>
              © {currentYear} Code and Design by:{" "}
              <a href='https://github.com/labadcloyd'>Cloyd Abad</a>
            </span>
            <span>
              Site powered by
              <a href='https://openweathermap.org/'> openweathermap.org </a>&
              <a href='https://locationiq.com/'> locationiq.com </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footerbar;
