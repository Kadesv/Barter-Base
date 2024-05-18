
export default function NoSignAlert(){
    return (
            <>

                <div

                    className=" flex card w-full bg-neutral rounded-none text-neutral-content z-10 fixed bottom-0">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">You must be signed in to do this.</h2>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>

            </>

    )
};