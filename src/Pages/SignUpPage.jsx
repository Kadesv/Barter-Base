import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { setAuthUser } = useOutletContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLName] = useState('');
    const [city, setCity] = useState('');
    const [stateOfLiving, setStateOfLiving] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleRegister = async (e, formData) => {
        e.preventDefault();

        const res = await axios.post('/api/register', formData)
        if (res.data.success) {
            setAuthUser(res.data.User)

            navigate('/')
        }
    };

    return (
        <div className="justify-center h-full my-20 flex flex-col items-center text-center">
            <h2 className="text-xl p-2 bg-base-100 rounded-lg mb-5 w-3/4 ">Please fill this out.</h2>
            <form
                onSubmit={(e) => {
                    handleRegister(e, {
                        firstName: firstName,
                        lastName: lastName,
                        city: city,
                        state: stateOfLiving,
                        zipCode: zipCode,
                        email: email,
                        password: password,
                    })
                }}>
                <div
                    className="grid grid-cols-2"
                >

                    {/* first name */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text"
                            required
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    {/* last name */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text"
                            required
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </label>
                    {/* city */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <input type="text"
                            required
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {/* state */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <input
                            className="placeholder-opacity-5"
                            type="text"
                            required
                            placeholder="State"
                            value={stateOfLiving}
                            onChange={(e) => setStateOfLiving(e.target.value)}
                        />
                    </label>
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <input type="text"
                            required
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </label>
                    {/* email */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {/* password */}
                    <label className="input bg-base-200 opacity-95 focus-within:bg-base-100  m-1 flex items-center col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            className="col-span-2"
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </label>
                    <button className="btn opacity-95 border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200 col-span-2 rounded-lg grid h-10 place-items-center" type="submit">Create Account</button>
                </div>


            </form>
        </div>
    );
};