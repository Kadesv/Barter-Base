import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { setUser } = useOutletContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLName] = useState('');
    const [pName, setPName] = useState('');
    const [city, setCity] = useState('');
    const [stateOfLiving, setStateOfLiving] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zipCode, setZipCode] = useState('');
    const preferredName = pName !== '' ? pName: firstName;

    const handleRegister = async (e, formData) => {
        e.preventDefault();

        const res = await axios.post('/api/register', formData)
        if (res.data.success) {
            setUser(res.data.User)
            navigate('/')
        }
    };

    return (
        <div className="justify-center items-center h-screen my-20 max-w-sm mx-auto md:max-w-sm gap-3 items-center text-center">
            <form onSubmit={(e) => {
                handleRegister(e, {
                    firstName: firstName,
                    lastName: lastName,
                    preferredName: preferredName,
                    city: city,
                    state: stateOfLiving,
                    zipCode: zipCode,
                    email: email,
                    password: password,
                })
            }}>

                {/* first name */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>

                {/* last name */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                </label>
                {/* preferred name */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text"
                        placeholder="Preferred Name (optional)"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                    />
                </label>
                {/* city */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <input type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                {/* state */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <input type="text"
                        placeholder="State"
                        value={stateOfLiving}
                        onChange={(e) => setStateOfLiving(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <input type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </label>
                {/* email */}
                <label className="input input-bordered flex items-center gap-2 md:shrink-0 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {/* password */}
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="btn btn-primary flex justify-center my-4" type="submit">Sign Up</button>
            </form>
        </div>
    );
};