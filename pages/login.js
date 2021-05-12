import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpboard.pythonanywhere.com/api";

const Login = () => {
  const router = useRouter();

  const googleAuthenticate = () => {
    var firebaseConfig = {
      apiKey: "AIzaSyA2ci3XMW9_tYFEdQnDH6YWyyvK4M2piq0",
      authDomain: "gp-project-board.firebaseapp.com",
      projectId: "gp-project-board",
      storageBucket: "gp-project-board.appspot.com",
      messagingSenderId: "288424037690",
      appId: "1:288424037690:web:03706eb138f8dcecbe1403",
      measurementId: "G-WNSR38RBR3",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        fetch(`${API}/check/user/${data.user.email}`)
          .then((response) => {
            return response.json();
          })
          .then((resp) => {
            if (resp.status === "ok") {
              toast("Identity verified!", { type: "success" });
              Cookies.set("gpbuser", data.user.email, { expires: 365 });
              Cookies.set("gpbusername", data.user.displayName, {
                expires: 365,
              });
              Cookies.set("gpbuserphoto", data.user.photoURL, { expires: 365 });
              router.push("/");
            } else {
              toast(resp.message, { type: "error" });
            }
          });
      })
      .catch((error) => {
        toast("Signin failed!", { type: "error" });
      });
  };

  const githubAuthenticate = () => {
    var firebaseConfig = {
      apiKey: "AIzaSyA2ci3XMW9_tYFEdQnDH6YWyyvK4M2piq0",
      authDomain: "gp-project-board.firebaseapp.com",
      projectId: "gp-project-board",
      storageBucket: "gp-project-board.appspot.com",
      messagingSenderId: "288424037690",
      appId: "1:288424037690:web:03706eb138f8dcecbe1403",
      measurementId: "G-WNSR38RBR3",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    var provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        fetch(`${API}/check/user/${data.user.email}`)
          .then((response) => {
            return response.json();
          })
          .then((resp) => {
            if (resp.status === "ok") {
              toast("Identity verified!", { type: "success" });
              Cookies.set("gpbuser", data.user.email, { expires: 365 });
              Cookies.set("gpbusername", data.user.displayName, {
                expires: 365,
              });
              Cookies.set("gpbuserphoto", data.user.photoURL, { expires: 365 });
              router.push("/");
            } else {
              toast(resp.message, { type: "error" });
            }
          });
      })
      .catch((error) => {
        toast("Signin failed!", { type: "error" });
      });
  };

  return (
    <>
      <Head>
        <title>GP Project Board | Login</title>
      </Head>
      <div className="signin-div conatiner">
        <h5 className="center white-text">GP Project Board</h5>
        <br />
        <div className="row">
          <a
            className="waves-effect waves-dark btn-large white blue-text center"
            style={{ borderRadius: "50px", marginRight: "20px" }}
            id="signin-btn"
            onClick={googleAuthenticate}
          >
            <span>Signin With Google</span>
          </a>
          <a
            className="waves-effect waves-dark btn-large black white-text center"
            style={{ borderRadius: "50px" }}
            id="signin-btn"
            onClick={githubAuthenticate}
          >
            <span>Signin With GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
