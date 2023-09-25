import CreateContact from "./create-contact";
import ViewContact from "./view-contact";
import { useState, useEffect } from 'react';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

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

  const showDeets = (contact) => {
    setSelectedContact(contact);
  }

  const handlePostRequest = (data) => {
    console.log("Inside the POST, ", data);
    fetch("http://localhost:8080/contacts", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("In the final stretch, ", data);
        setContacts([...contacts, data]);
    })
}

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.id}><button onClick={() => showDeets(contact)}>{contact.name}</button></div>
            ))}
            {selectedContact && <ViewContact contact={selectedContact} />}
            <CreateContact submit={handlePostRequest} />
        </div>
    )
}

export default Contacts;