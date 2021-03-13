import React, { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { withRouter } from "react-router-dom";
import AppContext from "../context/AppContext";

function Header(props) {
  const { setUser } = useContext(AppContext);
  function handleLogout() {
    fetch(`/logout`)
      .then((res) => {
        setUser({ user: null });
        props.history.push("/login");
      })
      .catch((err) => {
        setUser({ user: null });
        props.history.push("/login");
      });
  }

  return (
    <header className="bg-gray-200 shadow-md">
      <div className="container mx-auto  lg:px-20 xl:px-40 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Complaint Tracker</h2>
          <AiOutlineLogout
            onClick={handleLogout}
            className="cursor-pointer"
            size={24}
          />
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
