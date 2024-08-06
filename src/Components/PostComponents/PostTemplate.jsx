import EditableTitle from "./EditableTitle";
import EditableImages from "./EditableImages";
import EditableText from "./EditableText";
import EditableButtons from "./EditableButtons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function PostTemplate({ initialData, initialIsEditing }) {

    const [title, setTitle] = useState(initialData.title);
    const [context, setContext] = useState(initialData.context);
    const [images, setImage] = useState(initialData.image);
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    // console.log(images)
    const editMode = (e) =>{ 
        e.preventDefault()
        setIsEditing(true);}
    const navigate = useNavigate();

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
        <>
            <form className="savePostForm">

                <div
                className="card bg-base-100 shadow-xl m-1"
                key={initialData.postId} >
                        
                        <div>
                        <EditableImages
                            value= {images}
                            isEditing={isEditing}
                            onValueChange={setImage}
                            />
                        </div>

                    <div>
                        <EditableTitle
                            value={title}
                            isEditing={isEditing}
                            onValueChange={setTitle}
                        />
                    </div>
                    <div>
                        <EditableText
                            value={context}
                            isEditing={isEditing}
                            onValueChange={setContext}
                        />
                    </div>

                    <div>
                        <EditableButtons
                            isEditing={isEditing}
                            onEditClick={(e) => editMode(e)}
                            onSaveClick={(e) => {
                                viewMode(e, {
                                    title: title,
                                    context: context,
                                    postId: initialData.postId
                                })
                            }}
                            onDeleteClick={(e) => { handleDeletePost(e, initialData.postId) }}
                            postId={initialData.postId}
                        />
                    </div>
                </div>
            </form >
        </>
    )
}
