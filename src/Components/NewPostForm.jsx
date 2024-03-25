import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import storage from "../services/firebase.config";
import { v4 as uuidv4 } from 'uuid';
import CurrencyInput from "react-currency-input-field";


const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function NewPostForm({ categories, signStatus }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [postImage, setPostImage] = useState(null);
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [price, setPrice] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const keyPressHandler = (event) => {
        const { key } = event;
        setPrice((prevValue) =>
            key !== "Backspace"
                ? !Number.isNaN(parseInt(key)) || key === "," || key === "."
                    ? prevValue + key
                    : prevValue
                : prevValue.substring(0, prevValue.length - 1)
        );

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log()
        if (!postImage) {
            console.log('add an image')
        }
        const imgRef = ref(storage, `posts/${postImage.name}_${uuidv4()}`)

        uploadBytes(imgRef, postImage).then((snapshot) => {
            getDownloadURL(imgRef).then(async (url) => {
                const dbObject = {
                    title: title.current.value,
                    context: context.current.value,
                    selectedSubCategory: selectedSubCategory.current.value,
                    image: url,

                }
                const res = await axios.post('/api/posts/create', dbObject);
                if (res.data.success) {
                    console.log('success')
                }
                else {
                    console.log('failed')
                }
            })
        })
    }


    const catMap = categories.map(({ categoryId, categoryName, }) => {
        return (

            <option key={categoryId} value={categoryId}>{categoryName}</option>


        )
    }
    );


    const subCatMap = () => {
        if (selectedCategory) {
            return (
                categories[selectedCategory - 1].subcategories.map(({ subCategoryId, subCategoryName }) => {
                    return (
                        <option key={subCategoryId} value={subCategoryId}>{subCategoryName}</option>
                    )
                })

            )
        }
    }

    // onSubmit={(e) => {
    //     handleFormCreation(e, {
    //         title: titleValue,
    //         context: contextValue,
    //     })
    // }}>
    const noSignAlert = () => {
        return (
            signStatus ?
                <>


                </>
                :
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
    }


    return (
        <>

            <h1>New Post</h1>
            <form className="grid"
                onSubmit={(e) => {
                    handleSubmit(e)

                }}>
                {/*category select */}

                <select
                    className="select m-2 select-bordered w-full max-w-xs"
                    onChange={(event) => { setSelectedCategory(event.target.value) }}
                    name="category" id="category"
                    defaultValue={''}>
                    <option disabled value={''} hidden>Category</option>
                    {catMap}
                </select>

                {/*subCategory select */}

                <select
                    className="select m-2 select-bordered w-full max-w-xs"
                    disabled={!selectedCategory}
                    onChange={(event) => { setSelectedSubCategory(event.target.value) }}
                    name="subCategory" id="subCategory"
                    defaultValue={''}>
                    <option disabled value={''} hidden >Sub Category</option>
                    {subCatMap()}
                </select>
                {/* title input */}
                <div>
                    <input
                        className="input m-2 input-bordered w-full max-w-xs"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </div>
                {/* price input */}
                <div className="priceInput">

                    <CurrencyInput
                        value={price}
                        placeholder={currencyFormat.format("")}
                        className="input m-2  input-bordered w-full max-w-xs"
                        onValueChange={(price) => setPrice(price)}
                        intlConfig={{ locale: "en-US", currency: 'USD' }}
                        allowDecimals={true}
                        allowNegativeValue={false}
                    />
                </div>
                {/*detail input */}
                <div>
                    <input
                        className="textarea m-2 textarea-bordered w-full max-w-xs"
                        placeholder="Details"
                        value={context}
                        onChange={(event) => { setContext(event.target.value) }}
                    />
                </div>
                {/*image input */}

                <input
                    className="file-input m-2 file-input-bordered w-full max-w-xs"
                    placeholder="image"
                    multiple type="file"
                    accept=".png, .jpg, .heic"
                    onChange={(event) => {
                        setPostImage(event.target.files)
                    }}
                />
                <button className='btn btn-neutral' type="submit">
                    submit
                </button>

            </form>
            {noSignAlert()}

        </>
    )
}