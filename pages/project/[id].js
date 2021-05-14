import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todocard from "../../components/Todocard";
import Ongoingcard from "../../components/Ongoingcard";
import Testingcard from "../../components/Testingcard";
import Deployedcard from "../../components/Deployedcard";

const API = "https://gpboard.pythonanywhere.com/api";
// const API = "http://127.0.0.1:5000/api";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({
    id: "",
    creatorEmail: "",
    createdOn: "",
    projectName: "Project Name",
    sharedWith: [],
    techUsed: [],
    board: {
      todo: [],
      onGoing: [],
      testing: [],
      deployed: [],
    },
  });
  const [today, setToday] = useState("");

  const fetchProject = () => {
    fetch(`${API}/get/project/${id}`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProject(data);
      });
  };

  const addNewFeature = (event) => {
    event.preventDefault();
    var newFeatureFieldValue = document.getElementById("newFeature").value;
    if (newFeatureFieldValue === "") {
      toast("New Feature name cannot be empty!", { type: "error" });
    } else {
      var form = document.getElementById("featureForm");
      fetch(`${API}/add/feature/to/project/${id}/${Cookies.get("gpbuser")}`, {
        method: "POST",
        body: new FormData(form),
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === "ok") {
            form.reset();
            toast(data.message, { type: "info" });
          } else {
            toast(data.message, { type: "error" });
          }
        });
    }
  };

  useEffect(() => {
    fetchProject();
    setInterval(fetchProject, 2000);
    setInterval(() => {
      var d = new Date();
      var currentdate = `${d.getDate()}-${
        d.getMonth() + 1
      }-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
      setToday(currentdate);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>{project.projectName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col s1 menu white-text">
            <Menu />
          </div>
          <div className="col s11 main-content">
            <div className="">
              <h5 className="grey-text">{project.projectName}</h5>
            </div>
            <div className="row">
              <div className="col s3" id="todo-div">
                <div className="column-heading center">
                  <p style={{ fontWeight: "bolder" }}>TODO</p>
                </div>
                <div className="card-holder">
                  {project.board.todo.map((feature) => {
                    return <Todocard feature={feature} projectId={id} />;
                  })}
                </div>
              </div>
              <div className="col s3" id="onGoing-div">
                <div className="column-heading center">
                  <p style={{ fontWeight: "bolder" }}>On Going</p>
                </div>
                <div className="card-holder">
                  {project.board.onGoing.map((feature) => {
                    return <Ongoingcard feature={feature} projectId={id} />;
                  })}
                </div>
              </div>
              <div className="col s3" id="testing-div">
                <div className="column-heading center">
                  <p style={{ fontWeight: "bolder" }}>Testing</p>
                </div>
                <div className="card-holder">
                  {project.board.testing.map((feature) => {
                    return <Testingcard feature={feature} projectId={id} />;
                  })}
                </div>
              </div>
              <div className="col s3" id="deployed-div">
                <div className="column-heading center">
                  <p style={{ fontWeight: "bolder" }}>Deployed</p>
                </div>
                <div className="card-holder">
                  {project.board.deployed.map((feature) => {
                    return <Deployedcard feature={feature} projectId={id} />;
                  })}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="card-panel" style={{ borderRadius: "30px" }}>
                <form id="featureForm">
                  <div className="input-field">
                    <i className="material-icons prefix">today</i>
                    <input
                      id="createdon"
                      type="text"
                      name="createdon"
                      value={today}
                      autoFocus
                      required
                    />
                    <label className="" for="createdon">
                      Created On
                    </label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">add_circle_outline</i>
                    <input
                      id="newFeature"
                      type="text"
                      name="newFeature"
                      autoComplete="off"
                    />
                    <label className="" for="newFeature">
                      New Feature
                    </label>
                  </div>
                  <a
                    class="btn-floating waves-effect waves-light blue pulse right"
                    onClick={addNewFeature}
                  >
                    <i class="material-icons">check</i>
                  </a>
                </form>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
