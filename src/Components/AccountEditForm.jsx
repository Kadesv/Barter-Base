export default function AccountEditableForm({ userInfo, setUserInfo, isEditingAccount, setIsEditingAccount }) {
    return (
        isEditingAccount ?
            <>
                <form
                    id='accountInfoForm'
                    onSubmit={(e) => handleUserUpdate(e)}
                    className="grid">
                    
                        <input
                            id="accountFNameInput"
                            value={userInfo.firstName === null ? '' : userInfo.firstName}
                            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="First Name" />
                   

                    
                        <input
                            id="accountLNameInput"
                            value={userInfo.lastName === null ? '' : userInfo.lastName}
                            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Last Name" />
                   

                    
                        <input
                            id="accountEmailInput"
                            value={userInfo.email === null ? '' : userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Email" />
                   

                    
                        <input
                            id="accountCityInput"
                            value={userInfo.city === null ? '' : userInfo.city}
                            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="City" />
                   

                    
                        <input
                            id="accountStateInput"
                            value={userInfo.state === null ? '' : userInfo.state}
                            onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="State" />
                   

                   
                        <input
                            id="accountZipCodeInput"
                            value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                            onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                            className="input m-1 input-ghost"
                            placeholder="Zipcode" />

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
            <p className="input input-ghost m-1">{userInfo.firstName}</p>
            <p className="input input-ghost m-1">{userInfo.lastName}</p>
            <p className="input input-ghost m-1">{userInfo.email}</p>
            <p className="input input-ghost m-1">{userInfo.city}</p>
            <p className="input input-ghost m-1">{userInfo.state}</p>
            <p className="input input-ghost m-1">{userInfo.zipCode}</p>



                <button 
                className="btn btn-info"
                onClick={()=> setIsEditingAccount(true)}>edit</button>

            </>

    )
}