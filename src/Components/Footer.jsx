import { memo } from 'react';
function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-10">
      <nav className="flex gap-10">
        <a href="#" onClick={(e) => e.preventDefault()}>About us</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
        <a href="#" onClick={(e) => e.preventDefault()}>FAQ</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Blog</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
      </nav>
      <div>
        <p>Copyright © {new Date().getFullYear()} - No Copyright</p>
      </div>
      {/* Social Media Links */}
      <div className="flex gap-4 mt-3">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="40" height="40" viewBox="0 0 40 40"
            className="fill-current">
           <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path></svg>
          
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="40" height="40" viewBox="0 0 40 40"
            className="fill-current">
           <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></svg>
        </a>
        {/* ...other social media icons to be added */}
      </div>
    
      <form className="mt-2">
        <h3>Join Our Newsletter!</h3>
        <label htmlFor='NewsLetterForm'  className='join label'> 
        <input id='NewsLetterForm' type="text" className="input join-item input-bordered flex w-full max-w-xs"  placeholder="Enter your email" />
        <button className="btn btn-primary join-item">Subscribe</button>
        </label>
      </form>
    </footer>
  );
}

export default memo(Footer);