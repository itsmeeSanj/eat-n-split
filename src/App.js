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

  const handleSplitBill = (val) => {
    console.log(val);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + val }
          : friend
      )
    );

    setSelectedFriend(null);
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

        {selectedFriend && (
          <FormSplitBill data={selectedFriend} onSplitBill={handleSplitBill} />
        )}
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

const FormSplitBill = ({ data, onSplitBill }) => {
  const [bill, setBill] = React.useState("");
  const [paidByUser, setPaidByUser] = React.useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = React.useState("");

  const handleSubmitBill = (e) => {
    e.preventDefault();
    let payValue;

    if (!bill || !paidByUser) return;

    whoIsPaying === "friend"
      ? (payValue = -paidByFriend)
      : (payValue = paidByFriend);

    // console.log("payVal", payValue);
    onSplitBill(payValue);
  };

  return (
    <form className='form-split-bill' onSubmit={handleSubmitBill}>
      <h2>SPLIT A BILL WITH {data?.name}</h2>

      <label>💰Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🙆‍♂️Your expenses</label>
      <input
        type='text'
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🙆{data?.name} Expenses</label>
      <input type='text' value={Math.abs(paidByFriend)} disabled />

      <label>🤑Who is paying bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{data?.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
