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
export default function PostTemplate({ initialData, user, initialIsEditing, categories }) {

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [newImageFile, setNewImageFile] = useState(null)
    const [postInfo, setPostInfo] = useState({
        postId: initialData.postId,
        title: initialData.title,
        context: initialData.context,
        image: initialData.image,
        price: initialData.price,
        selectedCategory: initialData.categoryId,
        selectedSubCategory: initialData.subCategoryId
    })

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
        if (newImageFile !== null) {
            for (let file of newImageFile) {
                const imgRef = ref(storage, `posts/${file.name}_${uuidv4()}`);
                try {
                    await uploadBytes(imgRef, file);
                    const url = await getDownloadURL(imgRef);
                    setPostInfo({ ...postInfo, image: [...postInfo.image, url] })
                } catch (error) {
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

    const handleCancel = (e, initialData) => {
        e.preventDefault();


    }
    return (

        <>
            <article id={`accountPost ${initialData.postId}`}
                className="m-14 flex flex-row max-h-96 carousel-item min-w-min "
                onSubmit={(e) => {
                    handleSubmit(e)
                }}>

                <form
                    className="grid grid-cols-3 h-auto w-full"
                    id={`editPostForm ${initialData.postId}`}>

                    <div className="col-span-1" >

                        <figure className="carousel w-full">
                            <ImageMap images={postInfo.image} user={user} userId={initialData.userId} isEditing={isEditing} />
                        </figure>

                    </div>
                    <div className="col-span-2">
                        <input
                            id={`titleInput ${initialData.postId}`}
                            maxLength={25}
                            className="input mb-1 mx-2 input-bordered w-full max-w-sm"
                            placeholder="Title"
                            readOnly={!isEditing}
                            value={postInfo.title}
                            onChange={(e) => { setPostInfo({ ...postInfo, title: e.target.value }) }}
                        />

                        {isEditing ?
                            <>
                                <select
                                    id={`catSelect ${initialData.postId}`}
                                    className="select my-1 mx-2 select-bordered w-full max-w-sm"
                                    onChange={(e) => { setPostInfo({ ...postInfo, selectedCategory: e.target.value }) }}
                                    name="category"
                                    defaultValue={postInfo.selectedCategory}>
                                    <option disabled value={''} hidden>Category</option>
                                    {catMap}
                                </select>

                                <select
                                    id={`subCatSelect ${initialData.postId}`}
                                    className=" subCategorySelect select my-1 mx-2 select-bordered w-full max-w-sm"
                                    disabled={!postInfo.selectedCategory}
                                    onChange={(e) => { setPostInfo({ ...postInfo, selectedSubCategory: e.target.value }) }}
                                    name="subCategory"
                                    defaultValue={postInfo.selectedSubCategory}>

                                    <option disabled value={''} hidden >Sub Category</option>

                                    {subCatMap()}

                                </select>
                            </>

                            :
                            <>
                                <input
                                    id={`catSelect ${initialData.postId}`}
                                    className="select my-1 mx-2 select-bordered w-full max-w-sm"
                                    onChange={(e) => { setPostInfo({ ...postInfo, selectedCategory: e.target.value }) }}
                                    name="category"
                                    value={categories.find((cat) => cat.categoryId === postInfo.selectedCategory).categoryName}
                                />


                                <input
                                    id={`subCatSelect ${initialData.postId}`}
                                    className=" subCategorySelect select my-1 mx-2 select-bordered w-full max-w-sm"
                                    disabled={!postInfo.selectedCategory}
                                    onChange={(e) => { setPostInfo({ ...postInfo, selectedSubCategory: e.target.value }) }}
                                    name="subCategory"
                                    value={categories.find((cat) => cat.categoryId === postInfo.selectedCategory).subcategories.find((subCat) => subCat.subCategoryId === postInfo.selectedSubCategory).subCategoryName}
                                />
                            </>
                        }

                        <CurrencyInput
                            id={`priceInput ${initialData.postId}`}
                            readOnly={!isEditing}
                            value={postInfo.price}
                            placeholder={currencyFormat.format("")}
                            className="input my-1 mx-2 select-bordered w-full max-w-sm"
                            onValueChange={(e) => setPostInfo({ ...postInfo, price: e })}
                            intlConfig={{ locale: "en-US", currency: 'USD' }}
                            allowDecimals={true}
                            allowNegativeValue={false}
                        />
                        <input
                            id={`imageInput ${initialData.postId}`}
                            disabled={!isEditing}
                            className="file-input mx-2 my-1 file-input-bordered w-full max-w-sm"
                            multiple
                            type="file"
                            accept=".png, .jpg, .heic"
                            onChange={(e) => {
                                setNewImageFile(e.target.files)
                            }}
                        />

                        <textarea
                            id={`contextInput ${initialData.postId}`}
                            maxLength={250}
                            readOnly={!isEditing}
                            className="textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-sm"
                            placeholder="Details"
                            value={postInfo.context}
                            onChange={(e) => { setPostInfo({ ...postInfo, context: e.target.value }) }}
                        />


                        {isEditing ?
                            <section
                                className=" mx-2 join w-full max-w-sm">

                                <button
                                    id={`saveBtn ${initialData.postId}`}
                                    type="submit"
                                    className="btn btn-outline border-gray-700  w-1/3 join-item "
                                    onClick={(e) => {
                                        viewMode(e)
                                    }}>
                                    save
                                </button>

                                <button
                                    id={`cancelBtn ${initialData.postId}`}
                                    onClick={(e) => { handleCancel(e, initialData) }}
                                    className="btn btn-outline border-gray-700  w-1/3  join-item">
                                    cancel
                                </button>

                                <button
                                    id={`deleteBtn ${initialData.postId}`}
                                    className="btn btn-outline border-gray-700  w-1/3 join-item btn-danger "
                                    onClick={(e) => { handleDeletePost(e, initialData.postId) }}>
                                    delete
                                </button>

                            </section>
                            :
                            <section className="  mx-2 join w-full max-w-sm">
                                <button
                                    id={`editBtnReadOnly ${initialData.postId}`}
                                    className="btn btn-outline border-gray-700  btn-ghost w-1/2 join-item"
                                    onClick={(e) => editMode(e)}>
                                    edit
                                </button>
                                <button
                                    id={`deleteBtnReadOnly ${initialData.postId}`}
                                    className="btn btn-outline border-gray-700  w-1/2 join-item btn-danger"
                                    onClick={(e) => { handleDeletePost(e, postInfo.postId) }}
                                >
                                    delete
                                </button>
                            </section>
                        }
                    </div>
                </form>
            </article>
        </>

    )
}