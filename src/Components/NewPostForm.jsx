import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import storage from "../services/firebase.config";
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
    const [urlArr, setUrlArr] =useState([])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postImage) {
            console.log('add an image')
        }
        const imgRef = ref(storage, `posts/${postImage.name}_${uuidv4()}`)

        uploadBytes(imgRef, postImage).then((snapshot) => {
            getDownloadURL(imgRef).then(async (url) => {
                const dbObject = {
                    price: price,
                    title: title,
                    context: context,
                    selectedSubCategory: selectedSubCategory,
                    image: [url],

                }
                // console.log(dbObject)
                const res = await axios.post('/api/posts/create', dbObject);
                console.log(res.data)
                if (res.data.success) {
                    console.log('success')
                }
                else {
                    console.log('failed')
                }
            })
        })
    };
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
    };
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
    };


    return (
        <>

            <h1>New Post</h1>
            <form className="grid"
                onSubmit={(e) => {
                    handleSubmit(e)

                }}>
                <select className=" categorySelect
                 select m-2 select-bordered w-full max-w-xs"
                    onChange={(event) => { setSelectedCategory(event.target.value) }}
                    name="category" id="category"
                    defaultValue={''}>
                    <option disabled value={''} hidden>Category</option>
                    {catMap}
                </select>
                <select className=" subCategorySelect 
                select m-2 select-bordered w-full max-w-xs"
                    disabled={!selectedCategory}
                    onChange={(event) => { setSelectedSubCategory(event.target.value) }}
                    name="subCategory" id="subCategory"
                    defaultValue={''}>
                    <option disabled value={''} hidden >Sub Category</option>
                    {subCatMap()}
                </select>
                <div className="titleInput">
                    <input
                        className="input m-2 input-bordered w-full max-w-xs"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </div>
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
                <div className="detailInput">
                    <input
                        className="textarea m-2 textarea-bordered w-full max-w-xs"
                        placeholder="Details"
                        value={context}
                        onChange={(event) => { setContext(event.target.value) }}
                    />
                </div>
                <div className="imageInput">
                    <input
                        className="file-input m-2 file-input-bordered w-full max-w-xs"
                        placeholder="image"
                        multiple type="file"
                        accept=".png, .jpg, .heic"
                        onChange={(event) => {
                            setPostImage(event.target.files[0])
                        }}
                    />
                </div>
                <button className='submitButton
                btn btn-neutral' type="submit">
                    submit
                </button>
            </form>
            {noSignAlert()}

        </>
    )
}