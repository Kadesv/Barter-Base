import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { setAuthUser } = useOutletContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [stateOfLiving, setStateOfLiving] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = {
            firstName,
            lastName,
            city,
            state: stateOfLiving,
            zipCode,
            email,
            password,
        };

        try {
            const res = await axios.post('/api/register', formData);
            if (res.data.success) {
                setAuthUser(res.data.User);
                navigate('/');
            } else {
                alert(res.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="mt-20 h-screen flex flex-col items-center text-center">
            <h2 className="text-2xl text-base-300 rounded-lg mb-3 max-w-max ">Account Creation</h2>
            <form onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-2">
                    {/* First Name */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="text" required placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>

                    {/* Last Name */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="text" required placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>

                    {/* City */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="text" required placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </label>

                    {/* State */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="text" required placeholder="State" value={stateOfLiving} onChange={(e) => setStateOfLiving(e.target.value)} />
                    </label>

                    {/* Zip Code */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="text" required placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </label>

                    {/* Email */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg">
                        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    {/* Password */}
                    <label className="input bg-base-200 border-2 border-base-300 focus-within:border-base-200 flex items-center shadow-lg col-span-2">
                        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    {/* Buttons */}
                    <button className="btn border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200 rounded-lg col-span-2" type="submit">
                        Create Account
                    </button>
                    <div className="divider text-base-300 col-span-2 before:bg-base-100 after:bg-base-100">or</div>
                    <a className="btn border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200 rounded-lg col-span-2" href="/signIn">
                        Have an account?
                    </a>
                </div>
            </form>
        </div>
    );
}
