import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";

export default function MainPage () {

    const history = useHistory();

    return(
        <div className="hero-banner">
            <img src="../images/iteration-1-images/logo.svg" alt="Logo" />
            <h1>KOD ACIKTIRIR<br/>PİZZA, DOYURUR</h1>
            <Button type="button" onClick={()=>{history.push("/order")}}>ACIKTIM</Button>
        </div>
    )
}