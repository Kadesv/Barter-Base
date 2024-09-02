import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImageMap from "./ImageMap";
import storage from "../services/firebase.config";
import CurrencyInput from "react-currency-input-field";
const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
export default function PostTemplate({ initialData, initialIsEditing, categories }) {

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [newImageFile, setNewImageFile] = useState(null)
    const [postInfo, setPostInfo] = useState({
        title: initialData.title,
        context: initialData.context,
        image: initialData.image,
        price: initialData.price,
        selectedCategory: initialData.categoryId,
        selectedSubCategory: initialData.subCategoryId
    })
    //   const [userInfo, setUserInfo] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode })


    const catMap = categories.map(({ categoryId, categoryName }) => {
        return (
            <option key={categoryId} value={categoryId}>{categoryName}</option>
        )
    }
    );

    const subCatMap = () => {
        if (postInfo.selectedCategory) {
            return (
                categories[postInfo.selectedCategory - 1].subcategories.map(({ subCategoryId, subCategoryName }) => {
                    return (
                        <option key={subCategoryId} value={subCategoryId}>{subCategoryName}</option>
                    )
                })

            )
        }
    };

    const editMode = (e) => {
        e.preventDefault()
        setIsEditing(true);
    }


    const viewMode = async (e) => {
        e.preventDefault();
        // console.log(newImageFile, postInfo)
        if (newImageFile !== null) {
            for (let file of newImageFile) {
                const imgRef = ref(storage, `posts/${file.name}_${uuidv4()}`);
                console.log(imgRef)
                try {
                    await uploadBytes(imgRef, file);
                    const url = await getDownloadURL(imgRef);
                    console.log(url)
                    setPostInfo({ ...postInfo, image: [...postInfo.image, url] })
                        console.log(postInfo.image)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        const res = await axios.put('/api/posts/save/', postInfo);
        if (res.data.success) {
            setIsEditing(false);
        }
    };

    const handleDeletePost = async (event, postId) => {

        event.preventDefault();
        await axios.delete(`/api/posts/delete/${postId}`);
        setIsEditing(false);
        navigate('/account');
    };

    const handleCancelClick = (e, initialData) => {
        e.preventDefault();


    }
    return (
        !isEditing ?

            <>
                <article id={`accountPost ${initialData.postId}`}
                    className="m-5 flex flex-row max-h-max carousel-item min-w-min">

                    <figure className="carousel min-w-max ">
                        <ImageMap images={postInfo.image} />
                    </figure>
                    <form
                        id={`readOnlyForm ${initialData.postId}`}>
                        <input
                            id={`titleReadOnly ${initialData.postId}`}
                            readOnly
                            className="input my-1 mx-2 input-bordered w-full max-w-xl"
                            maxLength={25}
                            placeholder="Title"
                            value={postInfo.title}
                        />
                        <input
                            id={`catReadOnly ${initialData.postId}`}
                            readOnly
                            className="select my-1 mx-2 select-bordered w-full max-w-xl"
                            name="category"
                            value={categories.find((cat) => cat.categoryId === postInfo.selectedCategory).categoryName} />
                        <input
                            id={`subCatReadOnly ${initialData.postId}`}
                            readOnly
                            className="select my-1 mx-2 select-bordered w-full max-w-xl"
                            name="subCategory"
                            value={categories.find((cat) => cat.categoryId === postInfo.selectedCategory).subcategories.find((subCat) => subCat.subCategoryId === postInfo.selectedSubCategory).subCategoryName} />

                        <CurrencyInput
                            readOnly
                            id={`priceReadOnly ${initialData.postId}`}
                            className="input my-1 mx-2 input-bordered w-full max-w-xl"
                            value={postInfo.price}
                            placeholder={currencyFormat.format("")}
                            intlConfig={{ locale: "en-US", currency: 'USD' }}
                            allowDecimals={true}
                            allowNegativeValue={false}
                        />
                        <textarea
                            readOnly
                            id={`contextReadOnly ${initialData.postId}`}
                            maxLength={250}
                            className="textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-xl"
                            placeholder="Details"
                            value={postInfo.context}
                        />
                        <section className=" my-1 mx-2 join w-full max-w-xl">
                            <button
                                id={`editBtnReadOnly ${initialData.postId}`}
                                className="btn btn-outline w-1/2 join-item"
                                onClick={(e) => editMode(e)}>
                                edit
                            </button>
                            <button
                                id={`deleteBtnReadOnly ${initialData.postId}`}
                                className="btn btn-outline w-1/2 join-item btn-danger join-item"
                                onClick={(e) => { handleDeletePost(e, postInfo.postId) }}
                            >
                                delete
                            </button>
                        </section>
                    </form>
                </article>
            </>

            :

            <>
                <article id={`accountPost ${initialData.postId}`}
                    className="m-5 border-solid flex flex-row max-h-96 carousel-item min-w-min"
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}>

                    <figure className="carousel min-w-max">
                        <ImageMap images={postInfo.image} />
                    </figure>

                    <form
                        id={`editPostForm ${initialData.postId}`}>

                        <input
                            id={`titleInput ${initialData.postId}`}
                            maxLength={25}
                            className="input my-1 mx-2 select-bordered w-full max-w-xl"
                            placeholder="Title"
                            value={postInfo.title}
                            onChange={(e) => { setPostInfo({ ...postInfo, title: e.target.value }) }}
                        />

                        <select
                            id={`catSelect ${initialData.postId}`}
                            className="select my-1 mx-2 select-bordered w-full max-w-xl"
                            onChange={(e) => { setPostInfo({ ...postInfo, selectedCategory: e.target.value }) }}
                            name="category"
                            defaultValue={postInfo.selectedCategory}>

                            <option disabled value={''} hidden>Category</option>

                            {catMap}

                        </select>

                        <select
                            id={`subCatSelect ${initialData.postId}`}
                            className=" subCategorySelect select my-1 mx-2 select-bordered w-full max-w-xl"
                            disabled={!postInfo.selectedCategory}
                            onChange={(e) => { setPostInfo({ ...postInfo, selectedSubCategory: e.target.value }) }}
                            name="subCategory"
                            defaultValue={postInfo.selectedSubCategory}>

                            <option disabled value={''} hidden >Sub Category</option>

                            {subCatMap()}

                        </select>

                        <CurrencyInput
                            id={`priceInput ${initialData.postId}`}
                            value={postInfo.price}
                            placeholder={currencyFormat.format("")}
                            className="input my-1 mx-2 select-bordered w-full max-w-xl"
                            onValueChange={(e) => setPostInfo({ ...postInfo, price: e })}
                            intlConfig={{ locale: "en-US", currency: 'USD' }}
                            allowDecimals={true}
                            allowNegativeValue={false}
                        />

                        <input
                            id={`contextInput ${initialData.postId}`}
                            maxLength={250}
                            className="textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-xl"
                            placeholder="Details"
                            value={postInfo.context}
                            onChange={(e) => { setPostInfo({ ...postInfo, context: e.target.value }) }}
                        />

                        <input
                            id={`imageInput ${initialData.postId}`}
                            className="file-input m-2 file-input-bordered w-full max-w-xl"
                            placeholder="image"
                            multiple
                            type="file"
                            accept=".png, .jpg, .heic"
                            onChange={(e) => {
                                setNewImageFile(e.target.files)
                            }}
                        />

                        <section
                            className="my-1 mx-2 join w-full max-w-xl">

                            <button
                                id={`saveBtn ${initialData.postId}`}
                                type="submit"
                                className="btn btn-outline w-1/3 join-item btn-success join-item"
                                onClick={(e) => {
                                    viewMode(e)
                                }}>
                                save

                            </button>

                            <button
                                id={`deleteBtn ${initialData.postId}`}
                                className="btn btn-outline w-1/3 join-item btn-danger join-item"
                                onClick={(e) => { handleDeletePost(e, initialData.postId) }}>
                                delete
                            </button>

                            <button
                                id={`cancelBtn ${initialData.postId}`}
                                onClick={(e) => { onCancelClick(e, initialData) }}
                                className="btn btn-outline w-1/3 join-item btn-warning join-item">
                                cancel
                            </button>

                        </section>
                    </form>
                </article>
            </>

    )
}