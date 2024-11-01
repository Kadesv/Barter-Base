export default function LogButton({ authUser, handleLogOut }) {
  return (
    !authUser ?
      <>
        <a className="hover:underline text-sm transition-all duration-150 bg-transparent hover:text-base" href='/signIn'>Login</a>
      </>

      :
      
      <>
      <button className="hover:underline text-sm transition-all duration-150 bg-transparent hover:text-base" onClick={handleLogOut}>Logout</button>
      <a className="hover:underline text-sm transition-all duration-150 bg-transparent hover:text-base" href="/account">Account</a>
      </>
  );
}