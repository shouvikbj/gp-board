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
  const [loading, setLoading] = useState(false);

  const checkAuth = () => {
    var userEmail = Cookies.get("gpbuser");
    var storedDisplayName = Cookies.get("gpbusername");
    var storedDisplayPhoto = Cookies.get("gpbuserphoto");
    if (userEmail) {
      setUser(userEmail);
      setDisplayName(storedDisplayName);
    } else {
      router.push("/login");
    }
  };

  const showLoader = () => {
    return (
      <div style={{ position: "fixed", bottom: "100px", right: "100px" }}>
        <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>

          <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>

          <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>

          <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sendingEmail = () => {
    setLoading(true);
    toast("Sending Message! Please wait!", { type: "info" });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us | GP Project Board</title>
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
                      Contact Us
                    </h5>
                  </div>
                  <br />
                  <br />
                  <div className="container">
                    <form
                      action="https://formspree.io/f/xqkwpeak"
                      method="POST"
                      onSubmit={sendingEmail}
                    >
                      <div className="input-field">
                        <i className="material-icons prefix">person</i>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={displayName}
                          autoFocus
                        />
                        <label className="" for="name">
                          Name
                        </label>
                      </div>
                      <br />
                      <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={user}
                          autoFocus
                        />
                        <label className="" for="email">
                          Email
                        </label>
                      </div>
                      <br />
                      <div className="input-field">
                        <i className="material-icons prefix">message</i>
                        <input
                          id="message"
                          type="text"
                          name="message"
                          autoComplete="off"
                          required
                        />
                        <label className="" for="message">
                          Write Your Message
                        </label>
                      </div>
                      <button
                        className="btn waves-effect waves-light btn-large blue"
                        type="submit"
                        style={{
                          borderRadius: "50px",
                          position: "fixed",
                          bottom: "20px",
                          right: "20px",
                        }}
                      >
                        Send Message
                        <i class="material-icons right ">send</i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col s3">
                <div>{loading ? showLoader() : ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newproject;
