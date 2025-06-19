import { useAuth } from "../context/AuthContext";

function Home() {
    const {user, logout} = useAuth();

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home;