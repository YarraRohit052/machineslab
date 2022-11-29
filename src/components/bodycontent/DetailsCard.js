import { Card } from "react-rainbow-components";
import "./DetailsCard.css";
import detailsImage from "../../images/detailimage1.gif";


const DetailsCard=()=>{

    return(
        <div className="details__card__container">
       
            <Card className="details__card">
            <div className="para__heading">
                <h1>Green Fusion IoT Solutions</h1>
                </div>
              <img
                src={detailsImage}
                className="rainbow-p-around_xx-large rainbow-m_auto rainbow-align-content_center details__image"
                alt="Internet of Things Based Lab Experiment Based System"

              />
            </Card>
        </div>
        
    );
};
export default DetailsCard;