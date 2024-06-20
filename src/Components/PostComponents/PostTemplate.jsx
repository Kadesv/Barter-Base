import EditableTitle from "./EditableTitle";
import EditableText from "./EditableText";
import EditableButtons from "./EditableButtons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function PostTemplate({ initialData, initialIsEditing }) {

    const [title, setTitle] = useState(initialData.title);
    const [context, setContext] = useState(initialData.context);
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const editMode = () => setIsEditing(true);
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
        console.log('hit');
        await axios.delete(`/api/posts/delete/${postId}`);
        setIsEditing(false);
        navigate('/account');
    };
    return (
        <>
            <form className="savePostForm">

                <div
                    style={{ width: '65rem' }} key={initialData.postId} className="m-4">
                    <div >
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
                            onEditClick={editMode}
                            onSaveClick={(e) => {
                                viewMode(e, {
                                    title: title,
                                    context: context,
                                    postId: initialData.forumId
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
