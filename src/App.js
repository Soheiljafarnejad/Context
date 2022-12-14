import { useAuth, useAuthDispatch } from "./context/AuthProvider";

function App() {
  const dispatch = useAuthDispatch();
  const { loading, user, error } = useAuth();

  const getUserInfo = () => {
    dispatch({ type: "USER_INFO" });
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
      <button className="bg-blue-500 text-white py-2 px-4 text-lg mb-4" onClick={getUserInfo}>
        get user info
      </button>
      <div>
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
        {user && (
          <div>
            <p>name : {user.name}</p>
            <p>email : {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
