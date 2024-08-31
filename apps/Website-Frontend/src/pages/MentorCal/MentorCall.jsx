import { useRecoilState } from "recoil";
import { authState } from "../../recoil/Authuser";
import NavBar from "../../components/NavBar/NavBar";

const MentorCal = () => {
    const [auth, setAuth] = useRecoilState(authState);

    return (
        <div>
            <NavBar />
            
        </div>
    );
}

export default MentorCal;