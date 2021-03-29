import Navbar from '../components/Navbar'
import Footerbar from '../components/Footerbar'

export default function Error(){
    return(
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <Navbar/>
            <div style={{position:'absolute', top:'40%', left:'50%', transform: 'translate(-50%, -50%)'}}>
                <h3 style={{fontSize:'1.5rem'}}>Error 404: could not find location</h3>
            </div>
            <div style={{position:'absolute', bottom:'0', width:'100%'}}>
                <Footerbar/>
            </div>
        </>
    )
}