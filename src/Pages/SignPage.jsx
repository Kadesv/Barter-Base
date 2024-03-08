import SignInForm from "../Components/SignInForm"

export default function SignPage() {

    const handleSignIn = async (event, formData) => {
        event.preventDefault();

        const res = await axios.post('/api/auth', formData);
        if (res.data.success) {
            const { username } = res.data.user;
            setUsername(username);
            handleClose();
            handleSignStatus();
        } else {
            setShow(true);


        }
    };

    return (
        <main>
            <h1>sign page</h1>

            <SignInForm onCancel={() => onCancel()} handleSignIn={handleSignIn} />
        </main>
    )
}