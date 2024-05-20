export default function LogoutButton({ signStatus, handleLogOut }) {
  return (
    !signStatus ?
      <>
        <a href='/signIn'>Login</a>
      </>
      :
      <>
        <button as="a"onClick={handleLogOut}>Logout</button>
      </>
  );
}