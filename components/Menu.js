import Link from "next/link";
import Image from "next/image";

const Menu = () => {
  return (
    <div className="menu">
      <div className="center">
        <Image className="logo" src="/logo48.png" width={60} height={60} />
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <Link href="/">
          <a>
            <div className="center">
              <i className="medium material-icons cyan-text">dashboard</i>
              <br /> Dashboard
            </div>
          </a>
        </Link>
        <br />
        {/*<Link href="/issues">
          <a>
            <div className="center">
              <i className="medium material-icons red-text">bug_report</i>
              <br />
              Issues
            </div>
          </a>
        </Link>
        <br /> */}
        <Link href="/new-project">
          <a>
            <div className="center">
              <i className="medium material-icons white-text">
                add_circle_outline
              </i>
              <br />
              New Project
            </div>
          </a>
        </Link>
        <br />
        <Link href="/contact">
          <a>
            <div className="center">
              <i className="medium material-icons orange-text">
                assignment_ind
              </i>
              <br />
              Contact
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
