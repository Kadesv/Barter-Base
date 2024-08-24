import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImageMap from "./ImageMap";
import CurrencyInput from "react-currency-input-field";
const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
export default function PostTemplate({ initialData, authStatus, initialIsEditing, categories }) {

    const navigate = useNavigate();
    const [title, setTitle] = useState(initialData.title);
    const [context, setContext] = useState(initialData.context);
    const [images, setImage] = useState(initialData.image);
    const [price, setPrice] = useState(initialData.price);
    const [selectedCategory, setSelectedCategory] = useState(initialData.categoryId);
    const [selectedSubCategory, setSelectedSubCategory] = useState(initialData.subCategoryId);
    //  createdDate, price, categoryId, subCategoryId

    const [isEditing, setIsEditing] = useState(initialIsEditing);

    const catMap = categories.map(({ categoryId, categoryName }) => {
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

    const editMode = (e) => {
        e.preventDefault()
        setIsEditing(true);
    }

    const viewMode = async (event, formData) => {
        event.preventDefault();

        const res = await axios.put('/api/posts/save/', formData);
        if (!res.data.success) {
            setTitle(data.title);
            setContext(data.context);
        }
        setIsEditing(false);
    };

    const handleDeletePost = async (event, postId) => {

        event.preventDefault();
        await axios.delete(`/api/posts/delete/${postId}`);
        setIsEditing(false);
        navigate('/account');
    };
    return (
        !isEditing ?

            <>
                <div
                    className="carousel-item"
                    key={`postForm ${initialData.postId}`}>
                    <div>{title}</div>
                    <div className="card card-body">
                        <div>{initialData.context}</div>
                        <div>{initialData.price}</div>
                        <div>{categories.find((cat) => cat.categoryId === initialData.categoryId).categoryName}</div>
                        <div>{categories.find((cat) => cat.categoryId === initialData.categoryId).subcategories.find((subCat) => subCat.subCategoryId === initialData.subCategoryId).subCategoryName}</div>
                        <div>{initialData.createdDate}</div>
                    </div>

                    <div className="card card-actions">
                        <button
                            className="btn"
                            onClick={(e) => editMode(e)}>
                            edit
                        </button>
                    </div>
                </div>
            </>

            :

            <>
                <form id="newPostForm"
                    className="grid carousel-item"
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                    <section className="carousel">
                        <ImageMap images={images} />
                    </section>

                    <select className=" categorySelect
                 select my-2 select-bordered w-full max-w-xs"
                        disabled={!authStatus}
                        onChange={(e) => { setSelectedCategory(e.target.value) }}
                        name="category" id="category"
                        defaultValue={initialData.categoryId}>
                        <option disabled value={''} hidden>Category</option>
                        {catMap}
                    </select>
                    <select
                        className=" subCategorySelect select my-2 select-bordered w-full max-w-xs"
                        disabled={!selectedCategory}
                        onChange={(e) => { setSelectedSubCategory(e.target.value) }}
                        name="subCategory" id="subCategory"
                        defaultValue={initialData.subCategoryId}>
                        <option disabled value={''} hidden >Sub Category</option>
                        {subCatMap()}
                    </select>
                    <div className="titleInput">
                        <input
                            id="titleInput"
                            maxLength={25}
                            disabled={!authStatus}
                            className="input my-2 input-bordered w-full max-w-xs"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="priceInput">

                        <CurrencyInput
                            id="currencyInput"
                            disabled={!authStatus}
                            value={price}
                            placeholder={currencyFormat.format("")}
                            className="input my-2  input-bordered w-full max-w-xs"
                            onValueChange={(price) => setPrice(price)}
                            intlConfig={{ locale: "en-US", currency: 'USD' }}
                            allowDecimals={true}
                            allowNegativeValue={false}
                        />
                    </div>
                    <div className="contextInput">
                        <input
                            id="contextInput"
                            disabled={!authStatus}
                            maxLength={250}
                            className="textarea textarea-md my-2 textarea-bordered w-full max-w-xs"
                            placeholder="Details"
                            value={context}
                            onChange={(e) => { setContext(e.target.value) }}
                        />
                    </div>
                    <div className="imageInput">
                        <input
                            disabled={!authStatus}
                            className="file-input my-2 file-input-bordered w-full max-w-xs"
                            placeholder="image"
                            multiple
                            type="file"
                            accept=".png, .jpg, .heic"
                            onChange={(e) => {
                                setPostImages(e.target.files)
                            }}
                        />
                    </div>
                    <button
                        className="btn btn-success join-item"
                        onClick={(e) => {
                            viewMode(e, {
                                title: title,
                                context: context,
                                price: price,
                                categoryId: selectedCategory,
                                subCategoryId: setSelectedSubCategory,

                                postId: initialData.postId
                            })
                        }}>
                        save

                    </button>
                    <button
                        className="btn btn-danger join-item"
                        onClick={(e) => { handleDeletePost(e, initialData.postId) }}
                    >
                        delete
                    </button>
                    <button
                        onClick={() => { onCancelClick() }}
                        className="btn btn-warning join-item">
                        cancel
                    </button>
                </form>
            </>

    )
}