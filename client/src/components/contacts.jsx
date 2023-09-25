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

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.id}><button onClick={() => showDeets(contact)}>{contact.name}</button></div>
            ))}
            {selectedContact && <ViewContact contact={selectedContact} />}
        </div>
    )
}

export default Contacts;