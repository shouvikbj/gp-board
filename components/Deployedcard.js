import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";

const Deployedcard = ({ feature, projectId }) => {
  return (
    <>
      <div
        key={feature.id}
        className="card light-blue container-fluid"
        style={{ width: "100%" }}
      >
        <div className="card-content white-text">
          <span className="card-title" style={{ fontWeight: "bolder" }}>
            {feature.featureName}
          </span>
          <p>
            <span>Moved On : {feature.createdOn}</span>
            <br />
            <span>
              Moved By : <br />
              <span className="addedBy" style={{ overflow: "hidden" }}>
                {feature.addedBy}
              </span>
            </span>
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default Deployedcard;
