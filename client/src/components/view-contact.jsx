function ViewContact(props) {
    const { contact } = props;
    return (
        <div>
            <h2>Name: {contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Notes: {contact.notes}</p>
        </div>
    )
}

export default ViewContact;