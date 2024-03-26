import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
// import { useOutletContext } from "react-router-dom";

export default function NewPostForm({ props }) {
    const categories = props;
    // const subcategories = categories;
    // console.log(categories)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [postImage, setPostImage] = useState(null);
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [price, setPrice] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!postImage) {
            // alert();
        }
        const imgRef = ref(storage, `posts/${postImage.name}_${uuidv4()}`)

        uploadBytes(imgRef, postImage).then((snapshot) => {
            getDownloadURL(imgRef).then(async (url) => {
                const dbObject = {
                    title: title.current.value,
                    context: context.current.value,
                    subCategory: subCategory.current.value,
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






    return (
        <>
            <form>
                <select onChange={(event) => { setSelectedCategory(event.target.value) }}
                    name="category" id="category">
                    <option>Category</option>
                    {catMap}
                </select>


                <select disabled={!selectedCategory}
                    onChange={(event) => { setSelectedSubCategory(event.target.value) }}
                    name="subCategory" id="subCategory">
                    <option>Sub Category</option>
                    {subCatMap()}
                </select>


                <input
                    placeholder="Title"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                />

                <input
                    placeholder="Price"
                    value={price}
                    onChange={(event) => { setPrice(event.target.value) }}
                />

                <input
                    placeholder="Details"
                    value={context}
                    onChange={(event) => { setContext(event.target.value) }}
                />
                <input
                    placeholder="image"
                    multiple type="file"
                    accept=".png, .jpg, .heic"
                    onChange={(event) => {
                        setPostImage(event.target.files)
                    }}
                />

            </form>

        </>
    )
}