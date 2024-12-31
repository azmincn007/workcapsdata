import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authtoken');

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        window.location.reload();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f0f8ff' }}>
        <h1 style={{ color: '#333' }}>Welcome to the Home Page!</h1>
        {token ? (
          <div>
            <p style={{ fontSize: '18px', color: '#555' }}>User is logged in with token: {token}</p>
            <button onClick={handleLogout} style={{ padding: '15px 30px', backgroundColor: '#ff6347', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '18px', color: '#555' }}>Please log in.</p>
            <button onClick={handleLogin} style={{ padding: '15px 30px', backgroundColor: '#4682b4', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
              Login
            </button>
          </div>
        )}
      </div>
    );
}
  
export default Home;