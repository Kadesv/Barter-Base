
export default function NoSignAlert() {
    return (
        <>

            <div

                className="  flex card bg-base-200 pb-44 h-1/5  w-full rounded-none text-neutral-content z-10 fixed bottom-10">
                <div className="card-body items-center text-center ">
                    <h2 className="card-title ">You must be signed in to use this.</h2>
                    <a
                        className='btn btn-outline'
                        href="/signIn">Sign In</a>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>

        </>

    )
};