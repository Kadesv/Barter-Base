import ImageMap from "../ImageMap";
export default function ImageInput({ isEditing, value, onValueChange }) {

    return (
        !isEditing ?
            <>

            </>

            :

            <>
                <div>
                    <input
                        id="imageInput"
                        className="file-input file-input-xs w-auto my-2 file-input-bordered  max-w-xs"
                        placeholder="image"
                        multiple
                        type="file"
                        accept=".png, .jpg, .heic"
                        onChange={(event) => {
                            onValueChange(event.target.files)
                        }}
                    />
                </div>
            </>
    )


}