export default function AccountEditableForm({ userInfo, setUserInfo, isEditingAccount, setIsEditingAccount }) {
    return (
        isEditingAccount ?
            <>
                <form
                    id='accountInfoForm grid-cols-1 border-current border-2'
                    onSubmit={(e) => handleUserUpdate(e)}
                    className="grid">

                    <input
                        id="accountFNameInput"
                        value={userInfo.firstName === null ? '' : userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="First Name" />



                    <input
                        id="accountLNameInput"
                        value={userInfo.lastName === null ? '' : userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="Last Name" />



                    <input
                        id="accountEmailInput"
                        value={userInfo.email === null ? '' : userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="Email" />



                    <input
                        id="accountCityInput"
                        value={userInfo.city === null ? '' : userInfo.city}
                        onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="City" />



                    <input
                        id="accountStateInput"
                        value={userInfo.state === null ? '' : userInfo.state}
                        onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="State" />



                    <input
                        id="accountZipCodeInput"
                        value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                        onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                        className="input input-ghost input-bordered m-1"
                        placeholder="Zip Code" />
            <div className="join ">
                    <button
                        className="btn join-item w-1/2 btn-success"
                        onClick={() => onSaveClick}>Save</button>
                    <button
                        className="btn join-item w-1/2 btn-warning"
                        onClick={() => onCancelClick}>cancel</button>
                        </div>
                </form>
            </>
            :
            <form
                className="grid grid-cols-1">
                <input readOnly placeholder="First Name" className="input input-ghost input-bordered m-1" value={userInfo.firstName? userInfo.firstName : ''} />
                <input readOnly placeholder="Last Name" className="input input-ghost input-bordered m-1" value={userInfo.lastName? userInfo.lastName : ''} />
                <input readOnly placeholder="Email" className="input input-ghost input-bordered m-1" value={userInfo.email? userInfo.email : ''} />
                <input readOnly placeholder="City" className="input input-ghost input-bordered m-1" value={userInfo.city? userInfo.city : ''} />
                <input readOnly placeholder="State" className="input input-ghost input-bordered m-1" value={userInfo.state? userInfo.state : ''} />
                <input readOnly placeholder="Zip Code" className="input input-ghost input-bordered m-1" value={userInfo.zipCode ? userInfo.zipCode : ''} />

                <button
                    className="btn btn-info"
                    onClick={() => setIsEditingAccount(true)}>edit</button>

            </form>

    )
}