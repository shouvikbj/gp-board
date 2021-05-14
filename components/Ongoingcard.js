import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";
// const API = "http://127.0.0.1:5000/api";

const Ongoingcard = ({ feature, projectId }) => {
  const moveToTesting = (featureId) => {
    var d = new Date();
    var timestamp = `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    fetch(
      `${API}/${projectId}/move/${featureId}/to/testing/${Cookies.get(
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

  const moveBackToTodo = (featureId) => {
    var d = new Date();
    var timestamp = `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    fetch(
      `${API}/${projectId}/move/${featureId}/back/to/todo/${Cookies.get(
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
        className="card orange container-fluid"
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
          <a
            class="waves-effect waves-light btn white grey-text"
            style={{ width: "100%", borderRadius: "20px" }}
            onClick={() => {
              moveToTesting(feature.id);
            }}
          >
            Move to Testing
          </a>
          <br />
          <br />
          <a
            class="waves-effect waves-light btn white grey-text"
            style={{ width: "100%", borderRadius: "20px" }}
            onClick={() => {
              moveBackToTodo(feature.id);
            }}
          >
            Move Back to TODO
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Ongoingcard;
