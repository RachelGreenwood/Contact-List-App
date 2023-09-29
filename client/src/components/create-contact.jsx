import { useRef } from 'react';

function CreateContact(props) {
    const userName = useRef();
    const userEmail = useRef();
    const userPhone = useRef();
    const userNotes = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userContact = {name: userName.current?.value, email: userEmail.current?.value, phone: userPhone.current?.value, notes: userNotes.current?.value}
        console.log("Inside the form, ", userContact);
        props.submit(userContact);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add a Contact</h2>
                <label>Name: </label>
                <input type='text' ref={userName} required></input>
                <label>Email: </label>
                <input type='text' ref={userEmail}></input>
                <label>Phone Number: </label>
                <input type='tel' ref={userPhone} required></input>
                <label>Notes: </label>
                <input type='text' ref={userNotes}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateContact;