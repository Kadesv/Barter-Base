export default function AccountEditableForm({ userInfo, setUserInfo, isEditingAccount, setIsEditingAccount }) {
    return (
        isEditingAccount ?
            <>
                <form
                    id='accountInfoForm'
                    onSubmit={(e) => handleUserUpdate(e)}
                    className="grid">
                    <label className="input flex items-center gap-2">
                        <input
                            id="accountFNameInput"
                            value={userInfo.firstName === null ? '' : userInfo.firstName}
                            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="First Name" />
                    </label>

                    <label className="input flex items-center gap-2">
                        <input
                            id="accountLNameInput"
                            value={userInfo.lastName === null ? '' : userInfo.lastName}
                            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Last Name" />
                    </label>

                    <label className="input flex items-center gap-2">
                        <input
                            id="accountEmailInput"
                            value={userInfo.email === null ? '' : userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Email" />
                    </label>

                    <label className="input flex items-center gap-2">
                        <input
                            id="accountCityInput"
                            value={userInfo.city === null ? '' : userInfo.city}
                            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="City" />
                    </label>

                    <label className="input flex items-center gap-2">
                        <input
                            id="accountStateInput"
                            value={userInfo.state === null ? '' : userInfo.state}
                            onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="State" />
                    </label>

                    <label className="input flex items-center gap-2">
                        <input
                            id="accountZipCodeInput"
                            value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                            onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Zipcode" />
                    </label>

                    <button 
                        className="btn btn-success" 
                        onClick={() => onSaveClick}>Save</button>
                    <button
                        className="btn btn-error"
                        onClick={() => onCancelClick}>cancel</button>
                </form>
            </>
            :
            <>
            <p>{userInfo.firstName}</p>
            <p>{userInfo.lastName}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.city}</p>
            <p>{userInfo.state}</p>
            <p>{userInfo.zipCode}</p>



                <button className="btn btn-info">edit</button>

            </>

    )
}