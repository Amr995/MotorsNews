import { Link } from "react-router-dom";

const HeaderRight = ({ toggle, setToggle }) => {
    return ( 
        <div className="header-right">
            <Link to="/login" className="header-right-link">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
            </Link>
        </div>
     );
}
 
export default HeaderRight;