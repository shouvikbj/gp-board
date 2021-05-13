import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";

const Home = () => {
  const colors = ["red", "green", "blue", "orange", "deeppink"];
  const router = useRouter();
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("/profileImage.png");
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);

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

  const logoutUser = () => {
    var choice = confirm("Want to Logout?");
    if (choice == true) {
      toast("Logged out!", { type: "success" });
      Cookies.remove("gpbuser");
      Cookies.remove("gpbusername");
      Cookies.remove("gpbuserphoto");
      router.push("/login");
    }
  };

  const checkForDBChange = () => {
    fetch(`${API}/check/dbstatus`, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.status === "ok" && resp.dbStatus === "true") {
          fetchAllProjects();
          fetchAllNotifications();
        }
      });
  };

  const fetchAllProjects = () => {
    fetch(`${API}/get/projects/${Cookies.get("gpbuser")}`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setProjects(data.projectsToShow);
        }
      });
  };

  const fetchAllNotifications = () => {
    fetch(`${API}/get/notifications/${Cookies.get("gpbuser")}`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setNotifications(data.notificationsToShow);
        }
      });
  };

  useEffect(() => {
    checkAuth();
    fetchAllProjects();
    fetchAllNotifications();
    setInterval(checkForDBChange, 1500);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | GP Project Board</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col s1 menu white-text">
            <Menu projects={projects} />
          </div>
          <div className="col s11 main-content">
            <div className="" style={{ paddingTop: "20px" }}>
              <div className="col s9">
                {/*<div className="left">
                  <div className="input-field">
                    <i className="material-icons prefix">search</i>
                    <input id="search" type="text" disabled />
                    <label>Search for Projects</label>
                  </div>
                </div>
                <br />
                <br />*/}
                <br />
                <br />
                <div className="center">
                  <h5 className="grey-text" style={{ fontWeight: "bolder" }}>
                    Your Projects
                  </h5>
                </div>
                <br />
                <div className="project-list row">
                  {projects.map((project, index) => {
                    return (
                      <div key={project.id} className="col project-cards">
                        <Link
                          href="/project/[id]"
                          as={`/project/${project.id}`}
                        >
                          <a>
                            <div
                              className="card-panel menu-card"
                              style={{
                                backgroundColor: `${colors[index % 5]}`,
                              }}
                            >
                              <h6
                                className="white-text"
                                style={{ fontWeight: "bolder" }}
                              >
                                {project.projectName}
                              </h6>
                              <small className="white-text">
                                Careted On: {project.createdOn}
                              </small>
                              <br />
                              {project.techUsed.map((tech, index) => {
                                return (
                                  <small key={index} className="white-text">
                                    {tech + ", "}
                                  </small>
                                );
                              })}
                            </div>
                          </a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col s3">
                <div className="right-part">
                  <h5 className="center">GP Project Board</h5>
                  <div className="divider"></div>
                  <br />
                  <div className="center" id="profile_image">
                    <Image
                      src={`${displayPhoto}`}
                      height={100}
                      width={100}
                      className="circle"
                    />
                  </div>
                  <h5
                    id="displayName"
                    className="center"
                    style={{ overflowX: "scroll" }}
                  >
                    {displayName}
                  </h5>
                  <p
                    id="displayEmail"
                    className="center"
                    style={{ overflowX: "scroll" }}
                  >
                    {user}
                  </p>
                  <div className="center">
                    <a
                      className="waves-effect waves-light btn"
                      id="logout"
                      onClick={logoutUser}
                    >
                      <i className="medium material-icons white-text">
                        power_settings_new
                      </i>
                    </a>
                  </div>
                </div>
                <br />
                <div className="right-part notification-card">
                  <h5 className="center">Notifications</h5>
                  <div className="divider"></div>
                  <div className="row">
                    <ul>
                      {notifications.map((notification) => {
                        return (
                          <li
                            key={notification.id}
                            className="col"
                            style={{ width: "100%", textAlign: "justify" }}
                          >
                            <Link href={notification.link}>
                              <a>
                                <a className="blue-text right">
                                  {notification.createdOn}
                                </a>
                                <br />
                                <a className="black-text">
                                  {notification.message}
                                </a>
                                <br />
                              </a>
                            </Link>
                            <hr />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
