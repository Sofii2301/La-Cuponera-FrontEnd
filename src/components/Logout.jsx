import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const Logout = () => {
    const { logout, userType } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        const res = logout();
        if(res){
            if (userType === 'vendedor') {
                navigate("/signin/vendedor");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
