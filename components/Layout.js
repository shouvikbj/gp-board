import Head from "next/head";
// import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&family=Oxygen&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <script src="/app.js"></script>
      </Head>
      <ToastContainer />
      <div>{children}</div>
    </>
  );
};

export default Layout;
