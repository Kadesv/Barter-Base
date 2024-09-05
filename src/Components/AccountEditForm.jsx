export default function AccountEditableForm({ userInfo, setUserInfo, isEditingAccount, setIsEditingAccount }) {
    return (
        isEditingAccount ?
            <>
                <form
                    id='accountInfoForm grid-cols-1'
                    onSubmit={(e) => handleUserUpdate(e)}
                    className="grid h-full">

                    <input
                        id="accountFNameInput"
                        value={userInfo.firstName === null ? '' : userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="First Name" />

                    <input
                        id="accountLNameInput"
                        value={userInfo.lastName === null ? '' : userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="Last Name" />

                    <input
                        id="accountEmailInput"
                        value={userInfo.email === null ? '' : userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="Email" />

                    <input
                        id="accountCityInput"
                        value={userInfo.city === null ? '' : userInfo.city}
                        onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="City" />

                    <input
                        id="accountStateInput"
                        value={userInfo.state === null ? '' : userInfo.state}
                        onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="State" />

                    <input
                        id="accountZipCodeInput"
                        value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                        onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                        className=" max-w-2xl input input-ghost input-bordered m-1"
                        placeholder="Zip Code" />

                    <div className=" max-w-2xl join ">

                        <button
                            id="accountSaveBtn"
                            className=" max-w-2xl btn join-item w-1/2 btn-success"
                            onClick={(e) => onAccSaveClick(e)}>Save</button>

                        <button
                            id="accountCancelBtn"
                            className=" max-w-2xl btn join-item w-1/2 btn-warning"
                            onClick={(e) => onAccCancelClick(e)}>cancel</button>

                    </div>
                </form>
            </>
            :

            <form
                className="grid border border-2 border-black rounded w-1/2 ">

                <input
                    readOnly
                    id="accountReadOnlyFName"
                    placeholder="First Name"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.firstName ? userInfo.firstName : ''} />

                <input
                    readOnly
                    id="accountReadOnlyLName"
                    placeholder="Last Name"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.lastName ? userInfo.lastName : ''} />

                <input
                    readOnly
                    id="accountReadOnlyEmail"
                    placeholder="Email"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.email ? userInfo.email : ''} />

                <input
                    readOnly
                    id="accountReadOnlyCity"
                    placeholder="City"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.city ? userInfo.city : ''} />

                <input
                    readOnly id="accountReadOnlyState"
                    placeholder="State"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.state ? userInfo.state : ''} />
                <input
                    readOnly
                    id="accountReadOnlyZipCode"
                    placeholder="Zip Code"
                    className="input max-w-xl input-ghost input-bordered m-1"
                    value={userInfo.zipCode ? userInfo.zipCode : ''} />

                <button
                    id="accountEditBtn"
                    className="btn btn-info"
                    onClick={() => setIsEditingAccount(true)}>edit</button>

            </form>

    )
}