import ImageMap from "../ImageMap";
export default function EditableImages(isEditing, value, onValueChange) {

    return (
        !isEditing ?

            <figure className=" carousel rounded-box">
                <ImageMap images={image} />

            </figure>

            :
            <>
                <figure className=" carousel rounded-box">
                    <ImageMap images={image} />

                </figure>
                <div className="imageInput">
                    <input
                        disabled={!authStatus}
                        className="file-input my-2 file-input-bordered w-full max-w-xs"
                        placeholder="image"
                        multiple
                        type="file"
                        accept=".png, .jpg, .heic"
                        onChange={(event) => {
                            setPostImages(event.target.files)
                        }}
                    />
                </div>
            </>
    )


}