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
    const [image, setImage] = useState(initialData.image);
    const [price, setPrice] = useState(initialData.price);
    const [selectedCategory, setSelectedCategory] = useState(initialData.categoryId);
    const [selectedSubCategory, setSelectedSubCategory] = useState(initialData.subCategoryId);
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
                <article id={`newPostForm ${initialData.postId}`}
                    className="m-5 flex flex-row max-h-96 carousel-item min-w-min">

                    <figure className="carousel min-w-max ">
                        <ImageMap images={image} />
                    </figure>
                    <form>
                        <input
                            readOnly
                            className="input my-1 mx-2 input-bordered w-full max-w-xl"
                            maxLength={25}
                            placeholder="Title"
                            value={initialData.title}
                        />
                        <input
                            readOnly
                            className="select my-1 mx-2 select-bordered w-full max-w-xl"
                            name="category" id="category"
                            value={categories.find((cat) => cat.categoryId === initialData.categoryId).categoryName} />
                        <input
                            readOnly
                            className="select my-1 mx-2 select-bordered w-full max-w-xl"
                            name="subCategory" id="subCategory"
                            value={categories.find((cat) => cat.categoryId === initialData.categoryId).subcategories.find((subCat) => subCat.subCategoryId === initialData.subCategoryId).subCategoryName} />

                        <CurrencyInput
                            readOnly
                            className="input my-1 mx-2 input-bordered w-full max-w-xl"
                            value={initialData.price}
                            placeholder={currencyFormat.format("")}
                            intlConfig={{ locale: "en-US", currency: 'USD' }}
                            allowDecimals={true}
                            allowNegativeValue={false}
                        />
                        <textarea
                            readOnly
                            maxLength={250}
                            className="textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-xl"
                            placeholder="Details"
                            value={initialData.context}
                        />
                        <section className=" my-1 mx-2 join w-full max-w-xl">
                            <button
                                className="btn btn-outline w-1/2 join-item"
                                onClick={(e) => editMode(e)}>
                                edit
                            </button>
                            <button
                                className="btn btn-outline w-1/2 join-item btn-danger join-item"
                                onClick={(e) => { handleDeletePost(e, initialData.postId) }}
                            >
                                delete
                            </button>
                        </section>
                    </form>
                </article>
            </>

            :

            <>
                <article id="newPostForm"
                    className="m-5 flex flex-row max-h-96 carousel-item min-w-min"
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                    <figure className="carousel min-w-max">
                        <ImageMap images={image} />
                    </figure>
                    <form>
                    <input
                        id="titleInput"
                        maxLength={25}
                        className="input my-1 mx-2 select-bordered w-full max-w-xl"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />

                    <select
                        className="select my-1 mx-2 select-bordered w-full max-w-xl"
                        onChange={(e) => { setSelectedCategory(e.target.value) }}
                        name="category"
                        id="category"
                        defaultValue={initialData.categoryId}>
                        <option disabled value={''} hidden>Category</option>
                        {catMap}

                    </select>

                    <select
                        className=" subCategorySelect select my-1 mx-2 select-bordered w-full max-w-xl"
                        disabled={!selectedCategory}
                        onChange={(e) => { setSelectedSubCategory(e.target.value) }}
                        name="subCategory" id="subCategory"
                        defaultValue={initialData.subCategoryId}>
                        <option disabled value={''} hidden >Sub Category</option>
                        {subCatMap()}
                    </select>

                    <CurrencyInput
                        id="currencyInput"
                        value={price}
                        placeholder={currencyFormat.format("")}
                        className="input my-1 mx-2 select-bordered w-full max-w-xl"
                        onValueChange={(price) => setPrice(price)}
                        intlConfig={{ locale: "en-US", currency: 'USD' }}
                        allowDecimals={true}
                        allowNegativeValue={false}
                    />

                    <input
                        id="contextInput"
                        maxLength={250}
                        className="textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-xl"
                        placeholder="Details"
                        value={context}
                        onChange={(e) => { setContext(e.target.value) }}
                    />

                    <input
                        className="file-input m-2 file-input-bordered w-full max-w-xl"
                        placeholder="image"
                        multiple
                        type="file"
                        accept=".png, .jpg, .heic"
                        onChange={(e) => {
                            setImage(e.target.files)
                        }}
                    />
                    <section
                        className="my-1 mx-2 join w-full max-w-xl">
                        <button
                            className="btn btn-outline w-1/3 join-item btn-success join-item"
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
                            className="btn btn-outline w-1/3 join-item btn-danger join-item"
                            onClick={(e) => { handleDeletePost(e, initialData.postId) }}
                        >
                            delete
                        </button>
                        <button
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