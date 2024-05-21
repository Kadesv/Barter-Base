import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignInPage() {
    const { setUserId, setAuthStatus, setFavorites } = useOutletContext();
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleSignIn = async (event, formData) => {
        event.preventDefault();

        const res = await axios.post('/api/auth', formData)
        if (res.data.success) {
            setFavorites(res.data.favorites)
            setAuthStatus(true)
            setUserId(res.data.user.preferredName)
            navigate('/')
        } else {
            alert("Email or Password is Incorrect")
        }
    };

    const handleCreate = () => {
        navigate("/signUp")
    };

    return (
        <div className="justify-center items-center h-screen my-20 max-w-sm mx-auto md:max-w-sm gap-3 items-center text-center">
            <>
                <form onSubmit={(e) => {
                    handleSignIn(e, {
                        email: emailValue,
                        password: passwordValue,
                    })
                }}>

                    {/* email */}
                    <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email"
                            placeholder="Email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </label>

                    {/* password */}
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </label>

                    <button className="btn btn-primary flex justify-center my-4" type="submit">Log In</button>
                </form>
                <button className="btn btn-neutral flex justify-center my-4" onClick={handleCreate}>Create Account</button>
            </>
        </div>
    );
};  