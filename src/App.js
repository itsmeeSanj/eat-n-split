import React, { Children } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showForm, setShowForm] = React.useState(false);
  const [addFriend, setAddFriend] = React.useState([]);

  const handleAddFriends = (friends) => {
    setAddFriend((friend) => [...friend, friends]);
  };

  return (
    <>
      <div className='app'>
        <div className='sidebar'>
          <ul>
            <FriendsList friendList={addFriend} />
          </ul>
          {showForm && (
            <>
              <FormAddForm onAddFriend={handleAddFriends} />
              <button className='button' onClick={() => setShowForm(false)}>
                Close
              </button>
            </>
          )}

          {!showForm && (
            <button className='button' onClick={() => setShowForm(!showForm)}>
              Add friend
            </button>
          )}
        </div>

        <FormSplitBill />
      </div>
    </>
  );
}

const FriendsList = ({ friendList }) => {
  const friends = friendList;

  return (
    <>
      {friends.map((item, index) => {
        return (
          <li key={index}>
            <img src={item?.url} alt={item.name} />
            <h3>{item?.name}</h3>

            {item?.balance < 0 && (
              <p className='red'>
                You owe {item?.name} ${Math.abs(item?.balance)}
              </p>
            )}

            {item?.balance > 0 && (
              <p className='green'>
                {item?.name} owes you ${Math.abs(item?.balance)}
              </p>
            )}

            {item?.balance === 0 && <p>You and {item?.name} are even</p>}

            <Button>Select</Button>
          </li>
        );
      })}
    </>
  );
};

const Button = ({ children }) => {
  return <button className='button'>{children}</button>;
};

const FormAddForm = ({ onAddFriend }) => {
  // const [form, setForm] = React.useState({
  //   name: "",
  //   url: "",
  // });

  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      name,
      url,
      balance: Math.round(Math.random()),
    };

    onAddFriend(newItems);

    setName("");
    setUrl("");
  };

  return (
    <>
      <form className='form-add-friend' onSubmit={(e) => handleSubmit(e)}>
        {/* <div className='form-split-bill'> */}
        <label htmlFor=''>👩‍👦friend name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/*  */}
        <label htmlFor=''>📷Image URL</label>
        <input
          type='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {/* </div> */}
        <Button>Add</Button>
      </form>
    </>
  );
};

const FormSplitBill = () => {
  return (
    <form className='form-split-bill'>
      <h2>SPLIT A BILL WITH CLARK</h2>

      {/*  */}
      <label>💰Bill Value</label>
      <input type='text' />

      <label>🙆‍♂️Your expenses</label>
      <input type='text' />

      <label>🙆Clark Expenses</label>
      <input type='text' disabled />

      <label>🤑Who is paying bill?</label>
      <select>
        <option value='you'>hello</option>
        <option value='me'>ME</option>
        <option value='he'>HE</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
