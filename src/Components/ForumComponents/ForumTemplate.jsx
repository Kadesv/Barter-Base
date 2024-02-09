import EditableTitle from "./EditableTitle";
import EditableText from "./EditableText";
import EditableButtons from "./EditableButtons";
import axios from "axios";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';


export default function ForumTemplate({ initialData, initialIsEditing }) {

    const [title, setTitle] = useState(initialData.title);
    const [context, setcontext] = useState(initialData.context);
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const editMode = () => setIsEditing(true);
    const navigate = useNavigate();

    const viewMode = async (event, formData) => {
        event.preventDefault();

        const res = await axios.put('/api/forums/save/', formData);
        if (!res.data.success) {
            setTitle(data.title);
            setcontext(data.context);
        }

        setIsEditing(false);
    };

    const handleDeleteForum = async (event, forumId) => {

        event.preventDefault();
        console.log('hit');
        await axios.delete(`/api/forums/delete/${forumId}`);
        setIsEditing(false);
        navigate('/account');
    };
    return (
        <>
            <Form className="saveForumForm">
                
                <Card size="xxl" 
                style={{ width: '65rem' }} key={initialData.forumId} className="m-4">
                    <Card.Header >
                    <EditableTitle
                        value={title}
                        isEditing={isEditing}
                        onValueChange={setTitle}
                    />
</Card.Header>
                    <Card.Body>
                        <EditableText
                            value={context}
                            isEditing={isEditing}
                            onValueChange={setcontext}
                        />
                    </Card.Body>

                    <Card.Footer>
                        <EditableButtons
                            isEditing={isEditing}
                            onEditClick={editMode}
                            onSaveClick={(e) => {
                                viewMode(e, {
                                    title: title,
                                    context: context,
                                    forumId: initialData.forumId
                                })
                            }}
                            onDeleteClick={(e) => { handleDeleteForum(e, initialData.forumId) }}
                            forumId={initialData.forumId}
                        />
                    </Card.Footer>
                </Card>
            </Form >
        </>
    )
}
