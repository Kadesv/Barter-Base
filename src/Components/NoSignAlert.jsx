
export default function NoSignAlert() {
    return (
        <>

            <div

                className=" rounded flex card w-full h-1/4 rounded-none text-neutral-content z-10 fixed bottom-10">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">You must be signed in to use this.</h2>
                    <a
                        className='btn '
                        href="/signIn">Sign In</a>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>

        </>

    )
};