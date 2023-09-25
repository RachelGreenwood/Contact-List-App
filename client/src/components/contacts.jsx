import { useEffect, useState } from 'react';

function Contacts() {
    const [contacts, setContacts] = useState([]);

    const getRequest = () => {
        fetch("http://localhost:8080/contacts")
            .then((response) => response.json())
            .then((contacts) => {
                setContacts(contacts);
                console.log('Contacts fetched...', contacts);
            });
    }

    useEffect(() => {
        getRequest();
    }, []);
    

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.id}>{contact.name}{contact.email}{contact.phone}{contact.notes}</div>
            ))}
        </div>
    )
}

export default Contacts;