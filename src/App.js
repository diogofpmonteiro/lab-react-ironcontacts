import "./App.css";
import contactJSON from "./contacts.json";
import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [contacts, setContacts] = useState(contactJSON.slice(0, 6));

  const addRandomContact = () => {
    // ? Why do the randomizer functions need to be inside the "main" function?
    const randomizer = Math.floor(Math.random() * contactJSON.length);
    const randomContact = contactJSON[randomizer];

    if (!contacts.includes(randomContact)) {
      setContacts(contacts.concat(randomContact)); // ? why concat
    }
  };

  const sortByName = () => {
    const contactsCopy = [...contacts];
    const contactsSortedByName = contactsCopy.sort((firstContact, secondContact) =>
      firstContact.name > secondContact.name ? 1 : -1
    );
    setContacts(contactsSortedByName);
  };

  const sortByPopularity = () => {
    const contactsCopy = [...contacts];
    const contactsSortedByPopularity = contactsCopy.sort((firstContact, secondContact) =>
      firstContact.popularity > secondContact.popularity ? -1 : 1
    );
    setContacts(contactsSortedByPopularity);
  };

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts(filteredContacts);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <button className='custom-btn' onClick={addRandomContact}>
        Add Random Contact
      </button>

      {/* HOW TO PASS A FUNCTION ON A COMPONENT ??????
      <Button buttonVal='Add Random Contact' onClick={addRandomContact} />*/}

      <button className='custom-btn' onClick={sortByPopularity}>
        Sort by Popularity
      </button>
      <button className='custom-btn' onClick={sortByName}>
        Sort Alphabetically
      </button>
      <table className='custom-table'>
        <thead>
          <tr>
            <th className='custth'>Picture</th>
            <th className='custth'>Name</th>
            <th className='custth'>Popularity</th>
            <th className='custth'>Won Oscar</th>
            <th className='custth'>Won Emmy</th>
          </tr>
        </thead>
        {contacts.map((eachContact) => (
          <tbody key={eachContact.id}>
            <tr>
              <th>
                <img className='custom-img' src={eachContact.pictureUrl} alt='celeb-pic' />
              </th>
              <th>{eachContact.name}</th>
              <th>{eachContact.popularity}</th>
              {eachContact.wonOscar ? <th>🏆</th> : <th></th>}
              {eachContact.wonEmmy ? <th>🏆</th> : <th></th>}
              <th>
                <button
                  className='custom-btn'
                  onClick={() => {
                    deleteContact(eachContact.id);
                  }}
                >
                  Delete
                </button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default App;
