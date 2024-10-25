import React from "react";

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
  const [friends, setFriends] = React.useState(initialFriends);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = React.useState(null);

  const handleShowAddFriend = () => {
    setShowAddForm((show) => !show);
  };

  const handleAddFriends = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddForm(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend?.id ? null : friend));
    setShowAddForm(false);
  };

  return (
    <>
      <div className='app'>
        <div className='sidebar'>
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}
          />

          {showAddForm && <FormAddForm onAddFriend={handleAddFriends} />}
          <button className='button' onClick={handleShowAddFriend}>
            {showAddForm ? "close" : "Add Friend"}
          </button>
        </div>

        {selectedFriend && <FormSplitBill data={selectedFriend} />}
      </div>
    </>
  );
}

const Button = ({ children, onClick }) => {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
};

const FriendsList = ({ friends, selectedFriend, onSelection }) => {
  return (
    <ul>
      {friends.map((item, index) => {
        const isSelected = selectedFriend?.id === item?.id;

        return (
          <li key={index} className={isSelected ? "selected" : ""}>
            <img src={item?.image} alt={item.name} />
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

            <Button onClick={() => onSelection(item)}>
              {isSelected ? "Close" : "Select"}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

const FormAddForm = ({ onAddFriend }) => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newItems = {
      id,
      name,
      image: `${image}?=${id}}`,
      balance: 0,
    };

    onAddFriend(newItems);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <>
      <form className='form-add-friend' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor=''>👩‍👦friend name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor=''>📷Image URL</label>
        <input
          type='url'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </>
  );
};

const FormSplitBill = ({ data }) => {
  return (
    <form className='form-split-bill'>
      <h2>SPLIT A BILL WITH {data?.name}</h2>

      {/*  */}
      <label>💰Bill Value</label>
      <input type='text' />

      <label>🙆‍♂️Your expenses</label>
      <input type='text' />

      <label>🙆{data?.name} Expenses</label>
      <input type='text' value={data?.balance} disabled />

      <label>🤑Who is paying bill?</label>
      <select>
        <option value='you'>You</option>
        <option value='me'>{data?.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
