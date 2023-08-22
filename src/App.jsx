import "./App.css";
import data from "./contacts.json";
import { useState } from "react";

function App() {
  const [contactList, setContactList] = useState(data.slice(0, 5));

  const handleAddContact = () => {
    let randomIndex = Math.floor(Math.random() * data.length);
    let randomContact = data[randomIndex];
    let clone = JSON.parse(JSON.stringify(contactList))
    clone.unshift(randomContact);
    setContactList(clone);
    let repeatedContact = contactList.find((eachContact) => {
      if (eachContact.id === randomContact.id) {
        return true
      }
    });

    if (repeatedContact !== undefined) {
      handleAddContact()
      return
    }
  }

  const handleSortContacts = () => {
    let clone = JSON.parse(JSON.stringify(contactList))
    clone.sort((contact1, contact2) => {
      return contact1.name > contact2.name ? 1 : -1
    })

    setContactList(clone)
  }
  const handleSortContactsByPopularity = () => {
    let clone = JSON.parse(JSON.stringify(contactList))
    clone.sort((contact1, contact2) => {
      return contact1.popularity > contact2.popularity ? 1 : -1
    })

    setContactList(clone)
  }

  const handleRemoveContact = (id) => {
    let filteredArr = contactList.filter((eachContact) => {
      if (eachContact.id === id) {
        return false
      }
      else {
        return true
      }
    })

    setContactList(filteredArr)
  }

  return (
    <div className="App">
      <h1>Contacts</h1>
      <button onClick={handleAddContact}>Add Random Contact</button>
      <button onClick={handleSortContacts}>Sort by Name</button>
      <button onClick={handleSortContactsByPopularity}>Sort by Popularity</button>
      <div className="contact-list">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((contact) => (
              <tr key={contact.id} className="contact">
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt={contact.name}
                    className="contact-image"
                    style={{ width: "200px" }}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? "🏆" : null}</td>
                <td>{contact.wonEmmy ? "🌟" : null}</td>
                <td>
                <button onClick={ () => handleRemoveContact(contact.id)}>Remove Contact</button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;