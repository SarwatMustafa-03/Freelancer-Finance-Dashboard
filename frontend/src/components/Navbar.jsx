const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2>Finance Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;