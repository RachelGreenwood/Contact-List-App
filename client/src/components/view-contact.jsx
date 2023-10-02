import { useState, useEffect } from 'react';

function ViewContact(props) {
    const { contact } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({...contact});

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({...editedContact, [name]: value})
    }

    const handleEditContact = () => {
        setEditedContact({...editedContact})
        fetch(`http://localhost:8080/contacts/${editedContact.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedContact)
        })
        .then((response) => response.json())
        .then(() => {
            setIsEditing(false);
        })
        .catch((err) => {
            console.error("Error updating contact: ", err);
        })
    }

    useEffect(() => {
        setEditedContact(contact);
    }, [contact]);

    return (
        <div>
            <h2>Name: {isEditing ? (<input type='text' name='name' value={editedContact.name} onChange={(e) => handleInputChange(e)}></input>) : (editedContact.name)}</h2>
            <p>Email: {isEditing ? (<input type='text' name='email' value={editedContact.email} onChange={(e) => handleInputChange(e)}></input>) : (editedContact.email)}</p>
            <p>Phone: {isEditing ? (<input type='tel' name='phone' value={editedContact.phone} onChange={(e) => handleInputChange(e)}></input>) : (editedContact.phone)}</p>
            <p>Notes: {isEditing ? (<input type='text' name='notes' value={editedContact.notes} onChange={(e) => handleInputChange(e)}></input>) : (editedContact.notes)}</p>
            {isEditing ? (<>
                    <button onClick={handleEditContact}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>) : (
                    <button onClick={handleEditClick}>Edit</button>
                )}
        </div>
    )
}

export default ViewContact;