
export default function NoSignAlert() {
    return (
        <>

            <div

                className=" flex card w-full h-1/5 bg-neutral rounded-none text-neutral-content z-10 fixed bottom-0">
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