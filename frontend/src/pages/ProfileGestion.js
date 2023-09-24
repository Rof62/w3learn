import { useState } from "react";

export default function ProfileGestion({ user, updateUser, deleteUser} ) {

    console.log(user);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    async function modifyName(newUserName) {
      console.log(newUserName);
      try {
        const response = await fetch("http://localhost:8003/updateUsername", {
          method: "PATCH",
          body: JSON.stringify(newUserName),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const backUser = await response.json();
          updateUser(backUser);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function handleDeleteUser(deletedUser) {
      try {
        const response = await fetch("http://localhost:8001/deleteUser", {
          method: "DELETE",
          body: JSON.stringify(deletedUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          deleteUser(deletedUser);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    function handleChange(e) {
      const value = e.target.value;
      setUsername(value);
    }
    
    const handleClick = () => {
      if (username.length) {
        modifyName({ ...user, username: username });
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.code === "Enter" && username.length) {
        modifyName({ ...user, username: username });
      } 
    };

    function handleChange2(e) {
      const value = e.target.value;
      setEmail(value);
    }
  
    const handleClick2 = () => {
      if (email.length) {
        modifyName({ ...user, email: email });
      }
    };
  
    const handleKeyDown2 = (e) => {
      if (e.code === "Enter" && username.length) {
        modifyName({ ...user, email: email });
      } 
    };

    function handleChange3(e) {
      const value = e.target.value;
      setPassword(value);
    }
  
    const handleClick3 = () => {
      if (password.length) {
        modifyName({ ...user, password: password });
      }
    };
  
    const handleKeyDown3 = (e) => {
      if (e.code === "Enter" && username.length) {
        modifyName({ ...user, password: password });
      } 
    };

    return(
        <div className="d-flex align-items-center flex-column  mb20 mt20">
            <h1>Gestion de profile</h1>
            <div className="cards">
              <div className="d-flex justify-content-center  mt20">
                <h3>Bienvenue {user.username}</h3>
              </div>
              <div className="gestion2">
              <div className="d-flex justify-content-center align-items-center gestion">
                <p className="">Votre password :</p>
                <input
                    type="name"
                    onChange={handleChange3}
                    onKeyDown={handleKeyDown3}
                    value={username}
                    className=""
                    placeholder="modifier votre pseudo"
                />
                
                <button onClick={handleClick3} className="btn btn-primary">
                    Modifier
                </button>
              </div> 
              <div className="d-flex justify-content-center align-items-center gestion">
                <p className="">Votre pseudo :</p>
                <input
                    type="name"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={username}
                    className=""
                    placeholder="modifier votre pseudo"
                />
                
                <button onClick={handleClick} className="btn btn-primary">
                    Modifier
                </button>
              </div> 
              <div className="d-flex justify-content-center align-items-center gestion">
                <p className="">Votre email :</p>
                <input
                    type="name"
                    onChange={handleChange2}
                    onKeyDown={handleKeyDown2}
                    value={username}
                    className=""
                    placeholder="modifier votre pseudo"
                />
                
                <button onClick={handleClick2} className="btn btn-primary">
                    Modifier
                </button>
                </div>
              </div> 
              
            </div>
        </div>
    )
}