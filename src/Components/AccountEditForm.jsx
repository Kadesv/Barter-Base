export default function AccountEditableForm({
    userInfo,
    setUserInfo,
    isEditingAccount,
    setIsEditingAccount,
    onAccCancelClick,
    onAccSaveClick,
}) {
    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditingAccount(true);
    };

    return isEditingAccount ? (
        <form
            onSubmit={onAccSaveClick}
            className="flex flex-col h-full border-3 border-base-300 p-5 rounded-xl items-center bg-base-200 w-80 shadow-lg"
        >
            <h1 className="text-2xl mb-6 text-gray-800">Edit Account Information</h1>

            {[
                { id: "firstName", label: "First Name", value: userInfo.firstName, key: "firstName" },
                { id: "lastName", label: "Last Name", value: userInfo.lastName, key: "lastName" },
                { id: "email", label: "Email", value: userInfo.email, key: "email", type: "email" },
                { id: "city", label: "City", value: userInfo.city, key: "city" },
                { id: "state", label: "State", value: userInfo.state, key: "state" },
                { id: "zipCode", label: "Zip Code", value: userInfo.zipCode, key: "zipCode", maxLength: 5 }
            ].map((input) => (
                <div key={input.id} className="relative mb-5 w-full">
                    <input
                        id={input.id}
                        type={input.type || "text"}
                        value={input.value || ""}
                        onChange={(e) => setUserInfo({ ...userInfo, [input.key]: e.target.value })}
                        className="peer input border-2 border-base-300 bg-base-100 w-full px-3  rounded-md placeholder-transparent focus:outline-none"
                        placeholder=" "
                        maxLength={input.maxLength || undefined}
                    />
                    <label
                        htmlFor={input.id}
                        className="absolute left-2 -top-5 text-gray-400 text-sm transition-all transform bg-transparent px-1 
                        peer-placeholder-shown:top-3  peer-placeholder-shown:scale-100
                        peer-focus:-top-5 "
                    >
                        {input.label}
                    </label>
                </div>
            ))}

            <div className="flex w-full justify-around ">
                <button
                    type="submit"
                    className="btn w-1/3"
                >
                    Save
                </button>

                <button
                    onClick={onAccCancelClick}
                    className="btn w-1/3"
                >
                    Cancel
                </button>
            </div>
        </form>
    ) : (
        <form className="flex flex-col h-full p-5 w-80 bg-base-200 rounded-xl shadow-lg">
            <h1 className="text-2xl mb-6 text-gray-800">Account Information</h1>

            {[
                { id: "readOnlyFirstName", label: "First Name", value: userInfo.firstName },
                { id: "readOnlyLastName", label: "Last Name", value: userInfo.lastName },
                { id: "readOnlyEmail", label: "Email", value: userInfo.email },
                { id: "readOnlyCity", label: "City", value: userInfo.city },
                { id: "readOnlyState", label: "State", value: userInfo.state },
                { id: "readOnlyZipCode", label: "Zip Code", value: userInfo.zipCode }
            ].map((input) => (
                <div key={input.id} className="relative mb-6 w-full">
                    <input
                        readOnly
                        id={input.id}
                        className="input border-2 border-base-300 bg-base-100 w-full px-3 py-2 rounded-md placeholder-transparent focus:outline-none"
                        placeholder=" "
                        value={input.value || ""}
                    />
                    <label
                        htmlFor={input.id}
                        className="absolute left-3 top-2 text-gray-500 text-sm transition-all transform bg-base-200 px-1 
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
                        peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-90 peer-placeholder-shown:" 
                    >
                        {input.label}
                    </label>
                </div>
            ))}

            <button
                onClick={handleEditClick}
                className="btn w-full mt-4"
            >
                Edit
            </button>
        </form>
    );
}
