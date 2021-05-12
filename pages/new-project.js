import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";

const Newproject = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("/profileImage.png");
  const [today, setToday] = useState("");

  const checkAuth = () => {
    var userEmail = Cookies.get("gpbuser");
    var storedDisplayName = Cookies.get("gpbusername");
    var storedDisplayPhoto = Cookies.get("gpbuserphoto");
    if (userEmail) {
      setUser(userEmail);
      setDisplayName(storedDisplayName);
      setDisplayPhoto(storedDisplayPhoto);
    } else {
      router.push("/login");
    }
  };

  const createNewProject = (event) => {
    event.preventDefault();
    var projectName = document.getElementById("projectname").value;
    if (projectName === "") {
      toast("Project Name cannot be empty!", { type: "warning" });
    } else {
      var form = document.getElementById("new-project-form");
      fetch(`${API}/create/project/${Cookies.get("gpbuser")}`, {
        method: "POST",
        body: new FormData(form),
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          if (resp.status === "ok") {
            toast(resp.message, { type: "info" });
            router.push("/");
          } else {
            toast(resp.message, { type: "error" });
          }
        });
    }
  };

  useEffect(() => {
    checkAuth();
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
        <title>GP Project Board | New Project</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col s1 menu white-text">
            <Menu />
          </div>
          <div className="col s11 main-content">
            <div className="" style={{ paddingTop: "20px" }}>
              <div className="col s9">
                <div className="">
                  <div className="center">
                    <h5 className="grey-text" style={{ fontWeight: "bolder" }}>
                      Create New Project
                    </h5>
                  </div>
                  <br />
                  <br />
                  <div className="container">
                    <form id="new-project-form">
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
                        <label className="black-text" for="createdon">
                          Created On
                        </label>
                      </div>
                      <br />
                      <div className="input-field">
                        <i className="material-icons prefix">
                          collections_bookmark
                        </i>
                        <input
                          id="projectname"
                          type="text"
                          name="projectname"
                          required
                        />
                        <label className="black-text" for="projectname">
                          New Project Name
                        </label>
                      </div>
                      <br />
                      <div className="input-field">
                        <i className="material-icons prefix">group_add</i>
                        <input id="sharedwith" type="text" name="sharedwith" />
                        <label className="black-text" for="sharedwith">
                          Give Access (separate IDs by space)
                        </label>
                      </div>
                      <br />
                      <div className="input-field">
                        <i className="material-icons prefix">language</i>
                        <input id="techused" type="text" name="techused" />
                        <label className="black-text" for="techused">
                          Technologies Planning to Use (separate by space)
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col s3">
                <button
                  className="btn waves-effect waves-light btn-large blue"
                  type="button"
                  style={{
                    borderRadius: "50px",
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                  }}
                  onClick={createNewProject}
                >
                  Create Project
                  <i class="material-icons right ">bubble_chart</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newproject;
