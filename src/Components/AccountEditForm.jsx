export default function AccountEditableForm({ userInfo, setUserInfo, isEditingAccount, setIsEditingAccount, onAccSaveClick}) {
    const onEditClick=(e) =>{
        e.preventDefault();
        setIsEditingAccount(true)
    }
    return (
        isEditingAccount ?
            <>
                <form
                    id='accountInfoForm'
                    onSubmit={(e) => handleUserUpdate(e)}
                    className="flex flex-col h-96 items-center justify-center w-full">
                        <h1 className="text-3xl flex justify-center text-base-200">Account Information</h1>
                        <input
                        id="accountFNameInput"
                        value={userInfo.firstName === null ? '' : userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="First Name" />

                    <input
                        id="accountLNameInput"
                        value={userInfo.lastName === null ? '' : userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="Last Name" />

                    <input
                        id="accountEmailInput"
                        value={userInfo.email === null ? '' : userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="Email" />

                    <input
                        id="accountCityInput"
                        value={userInfo.city === null ? '' : userInfo.city}
                        onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="City" />

                    <input
                        id="accountStateInput"
                        value={userInfo.state === null ? '' : userInfo.state}
                        onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="State" />

                    <input
                        id="accountZipCodeInput"
                        value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                        onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                        className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                        placeholder="Zip Code" />

                    <div className=" w-2/3 join m-1 ">
                        <button
                            id="accountSaveBtn"
                            className=" btn opacity-95 border-base-300 join-item border-2 hover:bg-base-100 bg-base-200 w-1/2 rounded-lg grid h-10 place-items-center"
                            onClick={(e) => onAccSaveClick(e)}>Save</button>

                        <button
                            id="accountCancelBtn"
                            className=" btn opacity-95 border-base-300 join-item border hover:bg-base-100 bg-base-200 w-1/2 rounded-lg grid h-10 place-items-center"
                            onClick={(e) => onAccCancelClick(e)}>cancel</button>

                    </div>
                </form>
            </>
            :

            <form
                className="flex flex-col h-96 items-center justify-center w-full">
                        <h1 className="text-2xl text-base-200">Account Information</h1>

                <input
                    readOnly
                    id="accountReadOnlyFName"
                    placeholder="First Name"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                    value={userInfo.firstName ? userInfo.firstName : ''} />

                <input
                    readOnly
                    id="accountReadOnlyLName"
                    placeholder="Last Name"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                    value={userInfo.lastName ? userInfo.lastName : ''} />

                <input
                    readOnly
                    id="accountReadOnlyEmail"
                    placeholder="Email"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                    value={userInfo.email ? userInfo.email : ''} />

                <input
                    readOnly
                    id="accountReadOnlyCity"
                    placeholder="City"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                    value={userInfo.city ? userInfo.city : ''} />

                <input
                    readOnly id="accountReadOnlyState"
                    placeholder="State"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100  flex items-center m-1"
                    value={userInfo.state ? userInfo.state : ''} />
                <input
                    readOnly
                    id="accountReadOnlyZipCode"
                    placeholder="Zip Code"
                    className="input bg-base-200 opacity-95 focus-within:bg-base-100 flex items-center m-1"
                    value={userInfo.zipCode ? userInfo.zipCode : ''} />

                <button
                    id="accountEditBtn"
                    className="btn opacity-95 border-base-300 m-1 border-2 hover:bg-base-100 bg-base-200 w-2/3 rounded-lg grid h-10 place-items-center"
                    onClick={(e) => onEditClick(e)}>edit</button>

            </form>

    )
}