import { useState } from 'react';
import logo from "../assets/logo.jpg";
import Login from "../Page/Auth/Login";
import Register from "../Page/Auth/Register";

const Navbar = () => {
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    document.getElementById("my_modal").showModal();
  };

  const closeModal = () => {
    setModalType('');
    document.getElementById("my_modal").close();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl w-20">
          <img src={logo} alt="Website logo" className="rounded-full" />
        </a>
      </div>
      <div className="navbar-end">
        <a className="btn" onClick={() => openModal('login')}>
          Login
        </a>

        {/* Combined modal for Login and Register */}
        <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            {modalType === 'login' && <Login />}
            {modalType === 'register' && <Register />}
            <div className="modal-action">
              {modalType === 'login' && (
                <button className="btn" onClick={() => openModal('register')}>
                  Register
                </button>
              )}
              {modalType === 'register' && (
                <button className="btn" onClick={() => openModal('login')}>
                  Back to Login
                </button>
              )}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
