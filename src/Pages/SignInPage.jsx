import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignInPage() {
    const { setAuthUser, setChatRooms, setFavorites } = useOutletContext();
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleSignIn = async (event, formData) => {
        event.preventDefault();

        const res = await axios.post('/api/auth', formData)
        if (res.data.success) {
            setFavorites(res.data.favorites)
            setChatRooms(res.data.rooms)
            setAuthUser(res.data.user)
            navigate('/')
        } else {
            alert("Email or Password is Incorrect")
        }
    };

    return (
        <div className="justify-center h-screen items-center my-20 max-w-sm mx-auto  gap-3 text-center">
            <>
                <form onSubmit={(e) => {
                    handleSignIn(e, {
                        email: emailValue,
                        password: passwordValue,
                    })
                }}>

                    {/* email */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 bg-transparent opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email"
                            className="bg-transparent"
                            placeholder="Email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </label>

                    {/* password */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 bg-transparent"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password"
                            className="bg-transparent"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </label>

                    <div className="flex w-full flex-col">
                        <button className="btn opacity-95 border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200  rounded-lg grid h-10 place-items-center" type="submit">Log In</button>
                        <div className=" divider opacity-95 text-base-100 before:bg-base-100 after:bg-base-100">or</div>
                        <a className="btn opacity-95 border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200  rounded-lg grid h-10 place-items-center" href="/signUp">Create Account</a>
                    </div>
                </form>
            </>
        </div>
    );
}; 