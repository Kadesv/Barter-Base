import { useState } from "react";

export default function SignUpPage() {

    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <main className="justify-center items-center h-screen my-20 max-w-sm mx-auto md:max-w-sm gap-3 items-center text-center">
            <h1>sign up page</h1>
            <form>
                {/* first name */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text"
                        placeholder="First Name"
                        value={firstNameValue}
                        onChange={(e) => setFirstNameValue(e.target.value)}
                    />
                </label>

                {/* first name */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text"
                        placeholder="Last Name"
                        value={lastNameValue}
                        onChange={(e) => setLastNameValue(e.target.value)}
                    />
                </label>
            </form>
        </main>
    )
};