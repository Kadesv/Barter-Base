export default function LogoutButton({ authStatus, handleLogOut }) {
  return (
    !authStatus ?
      <>
        <a href='/signIn'>Login</a>
      </>
      :
      <>
        <button as="a"onClick={handleLogOut}>Logout</button>
      </>
  );
}