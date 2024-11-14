import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import storage from "../services/firebase.config";
import CurrencyInput from "react-currency-input-field";

const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function NewPostForm({ categories, authUser, setShowDrawer, setActiveTab }) {
    const [formInfo, setFormInfo] = useState({
        selectedCategory: null,
        selectedSubCategory: null,
        title: '',
        image: [],
        price: '',
        context: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formInfo.image.length) {
            alert('Please add image/s');
            return;
        }

        const urlArr = [];
        for (let file of formInfo.image) {
            const imgRef = ref(storage, `posts/${file.name}_${uuidv4()}`);
            try {
                await uploadBytes(imgRef, file);
                const url = await getDownloadURL(imgRef);
                urlArr.push(url);
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }

        const res = await axios.post('/api/posts/create', { ...formInfo, image: urlArr });
        if (res.data.success) {
            setShowDrawer(false);
            setActiveTab(null);
            setFormInfo({
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

    const catMap = categories.map(({ categoryId, categoryName }) => (
        <option key={categoryId} value={categoryId}>{categoryName}</option>
    ));

    const subCatMap = () => {
        const selectedCategory = categories.find(cat => cat.categoryId === formInfo.selectedCategory);
        return selectedCategory ? selectedCategory.subcategories.map(({ subCategoryId, subCategoryName }) => (
            <option key={subCategoryId} value={subCategoryId}>{subCategoryName}</option>
        )) : null;
    };

    return (
        <form
            id="newPostForm"
            className="grid gap-4"
            onSubmit={handleSubmit}
        >
            <select
                className="select my-2 select-bordered w-full"
                disabled={!authUser}
                onChange={(e) => setFormInfo({ ...formInfo, selectedCategory: Number(e.target.value) })}
                name="category"
                id="category"
                value={formInfo.selectedCategory || ''}
            >
                <option disabled value="">Category</option>
                {catMap}
            </select>
            
            <select
                className="select my-2 select-bordered w-full"
                disabled={!formInfo.selectedCategory}
                onChange={(e) => setFormInfo({ ...formInfo, selectedSubCategory: Number(e.target.value) })}
                name="subCategory"
                id="subCategory"
                value={formInfo.selectedSubCategory || ''}
            >
                <option disabled value="">Sub Category</option>
                {subCatMap()}
            </select>
            
            <input
                id="titleInput"
                maxLength={25}
                disabled={!authUser}
                className="input my-2 input-bordered w-full"
                placeholder="Title"
                value={formInfo.title}
                onChange={(e) => setFormInfo({ ...formInfo, title: e.target.value })}
            />
            
            <CurrencyInput
                id="currencyInput"
                disabled={!authUser}
                value={formInfo.price}
                placeholder={currencyFormat.format("")}
                className="input my-2 input-bordered w-full"
                onValueChange={(value) => setFormInfo({ ...formInfo, price: value })}
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
                value={formInfo.context}
                onChange={(e) => setFormInfo({ ...formInfo, context: e.target.value })}
            />
            
            <input
                disabled={!authUser}
                className="file-input my-2 file-input-bordered w-full"
                type="file"
                multiple
                accept=".png, .jpg, .heic"
                onChange={(e) => setFormInfo({ ...formInfo, image: e.target.files })}
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
