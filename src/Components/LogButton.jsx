export default function LogButton({ authStatus, handleLogOut }) {
  return (
    !authStatus ?
      <li>
        <a href='/signIn'>Login</a>
      </li>
      :
      <li>
        <button as="a"onClick={handleLogOut}>Logout</button>
      </li>
  );
}