import ImageMap from "../ImageMap";
export default function EditableImages({isEditing, value, onValueChange}) {

    return (
        !isEditing ?

             <figure className=" h-60  w-auto carousel rounded-box">
                <ImageMap images={value} /> 
                
                
            </figure>

            :

            <>
                <figure className=" h-60 min-w-1/5 carousel rounded-box">
                    <ImageMap images={value} />
                </figure>
                
                <div className="imageInput">
                    <input
                        className="file-input w-auto my-2 file-input-bordered  max-w-xs"
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