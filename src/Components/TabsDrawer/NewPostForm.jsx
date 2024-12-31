import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import storage from "../../services/firebase.config";
import CurrencyInput from "react-currency-input-field";
import CategoryDropdown from "../Reuseable/CategoryDropdown";

const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function NewPostForm({ props:{categories, authUser, setShowDrawer, setActiveTab} }) {
    const [postInfo, setPostInfo] = useState({
        selectedCategory: null,
        selectedSubCategory: null,
        title: '',
        image: [],
        price: '',
        context: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!postInfo.image.length) {
            alert('Please add image/s');
            return;
        }

        const urlArr = [];
        for (let file of postInfo.image) {
            const imgRef = ref(storage, `posts/${file.name}_${uuidv4()}`);
            try {
                await uploadBytes(imgRef, file);
                const url = await getDownloadURL(imgRef);
                urlArr.push(url);
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }

        const res = await axios.post('/api/posts/create', { ...postInfo, image: urlArr });
        if (res.data.success) {
            setShowDrawer(false);
            setActiveTab(null);
            setPostInfo({
                selectedCategory: null,
                selectedSubCategory: null,
                title: '',
                image: [],
                price: '',
                context: ''
            });
        } else {
            alert('Something went wrong!');
        }
    };

    return (
        <form
            id="newPostForm"
            className="flex flex-col "
            onSubmit={handleSubmit}
        >
            <CategoryDropdown props={{categories, postInfo, setPostInfo, authUser}}/>
            
            <input
                id="titleInput"
                maxLength={25}
                disabled={!authUser}
                className="input my-2 input-bordered w-full"
                placeholder="Title"
                value={postInfo.title}
                onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
            />
            
            <CurrencyInput
                id="currencyInput"
                disabled={!authUser}
                value={postInfo.price}
                placeholder={currencyFormat.format("")}
                className="input my-2 input-bordered w-full"
                onValueChange={(value) => setPostInfo({ ...postInfo, price: value })}
                intlConfig={{ locale: "en-US", currency: 'USD' }}
                allowDecimals={true}
                maxLength={6}
                allowNegativeValue={false}
            />
            
            <textarea
                id="contextInput"
                disabled={!authUser}
                maxLength={250}
                className="textarea textarea-md my-2 textarea-bordered w-full"
                placeholder="Details"
                value={postInfo.context}
                onChange={(e) => setPostInfo({ ...postInfo, context: e.target.value })}
            />
            
            <input
                disabled={!authUser}
                className="file-input my-2 file-input-bordered w-full"
                type="file"
                multiple
                accept=".png, .jpg, .heic"
                onChange={(e) => setPostInfo({ ...postInfo, image: e.target.files })}
            />
            
            <button
                className="btn btn-neutral w-full"
                disabled={!authUser}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}
