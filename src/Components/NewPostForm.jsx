import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function NewPostForm() {

    const [postImage, setPostImage] = useState(null);
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [price, setPrice] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!postImage) {
            alert();
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


    const allCategories = [
        {
            categoryName: 'Apparel',
            subcategories: ['Services', 'Children', 'Men', 'Women', 'Baby']
        },
        {
            categoryName: 'Automotive',
            subcategories: ['Services', 'Parts', 'Equiptment', 'Rentals']
        },
        {
            categoryName: 'Home',
            subcategories: ['Services', 'Furniture', 'Outdoors', 'Equiptment', 'Appliances']
        },
        {
            categoryName: 'Entertainment',
            subcategories: ['Services', 'Books', 'Electronics', 'Equiptment', 'Instruments', 'Events']
        },
        {
            categoryName: 'Sports',
            subcategories: ['Water', 'Biking', 'Running', 'Winter', 'General']
        },
        {
            categoryName: 'Outdoors',
            subcategories: ['Services', 'Resources', 'Equiptment']
        },
        {
            categoryName: 'Animals',
            subcategories: ['Services', 'LiveStock', 'Exotic', 'Pets']
        },
    ];



    return (
        <>
            <form>
                <select placeholder="Category"onChange={(event) => { setCategory() }}
                    name="category" id="category">
                    <option value="1">Apperal</option>
                    <option value="2">Automotive</option>
                    <option value="3">Home</option>
                    <option value="4">Entertainment</option>
                    <option value="5">Sports</option>
                    <option value="6">Outdoors</option>
                    <option value="7">Animals</option>
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