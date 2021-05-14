import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";
// const API = "http://127.0.0.1:5000/api";

const Todocard = ({ feature, projectId }) => {
  const moveToOnGoing = (featureId) => {
    var d = new Date();
    var timestamp = `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    fetch(
      `${API}/${projectId}/move/${featureId}/to/onGoing/${Cookies.get(
        "gpbuser"
      )}/${timestamp}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          toast(data.message, { type: "info" });
        } else {
          toast(data.message, { type: "error" });
        }
      });
  };

  return (
    <>
      <div
        key={feature.id}
        className="card pink darken-2 container-fluid"
        style={{ width: "100%" }}
      >
        <div className="card-content white-text">
          <span className="card-title" style={{ fontWeight: "bolder" }}>
            {feature.featureName}
          </span>
          <p>
            <span>Created On : {feature.createdOn}</span>
            <br />
            <span>
              Added By : <br />
              <span className="addedBy" style={{ overflow: "hidden" }}>
                {feature.addedBy}
              </span>
            </span>
          </p>
          <br />
          <a
            class="waves-effect waves-light btn white grey-text"
            style={{ width: "100%", borderRadius: "20px" }}
            onClick={() => {
              moveToOnGoing(feature.id);
            }}
          >
            Move to On Going
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Todocard;
