'use client'

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import '@/app/css/profile.css';
import LoadingOverlay from "../components/loadingOverlay";

export default function Profile({ params }) {
  const [query, setQuery] = useState({});
  const [editable, setEditable] = useState(false);
  const [showPassword, setShowPassword] = useState({
    accountPassword: false,
    wifiPassword: false
  });
  const [formData, setFormData] = useState({
    owner: '',
    deviceId: '',
    ssid: '',
    pass: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem('logged'));
    fetch(`/api/device?deviceId=${data.deviceId}`)
      .then(res => {
        if (!res.ok) throw new Error;
        return res.json();
      })
      .then(res => {
        setQuery(res);
        setFormData(res);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true)
    fetch(`/api/device`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        setIsLoading(false)
        if (!res.ok) throw new Error;
        return res.json();
      })
      .then(() => {
        setEditable(false);
        setQuery(formData);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Navbar active={'kuis'} text={'Profil'} />
      <main id='profile' className="profile-main">
        <div className="profile-container">
          <div className="profile-picture">
            <div className="profile-block">
              <i className="bi bi-person profile-icon"></i>
            </div>
          </div>
          <div className="profile-edit-button">
            <button
              className="edit-button"
              onClick={() => {
                if (editable) handleSave();
                setEditable(!editable);
              }}
            >
              {editable ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="profile-fields">

            <div className='divider'>
              <p>Pengaturan Akun</p>
            </div>
            <div className="profile-field">
              <label className="profile-label">Owner</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                disabled={!editable}
                className={`profile-input ${editable ? 'editable' : ''}`}
              />
            </div>
            <div className="profile-field">
              <label className="profile-label">Device ID</label>
              <input
                type="text"
                name="deviceId"
                value={formData.deviceId}
                disabled
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <div className='password-label'>
                <label className="profile-label">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(prevState => ({
                    ...prevState,
                    accountPassword: !prevState.accountPassword
                  }))}
                  className="show-password-button"
                >
                  {showPassword.accountPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword.accountPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                disabled={!editable}
                className={`profile-input ${editable ? 'editable' : ''}`}
              />
            </div>

            <div className='divider'>
              <p>Pengaturan Koneksi Wifi</p>
            </div>

            <div className="profile-field">
              <label className="profile-label">SSID</label>
              <input
                type="text"
                name="ssid"
                value={formData.ssid}
                onChange={handleInputChange}
                disabled={!editable}
                className={`profile-input ${editable ? 'editable' : ''}`}
              />
            </div>
            <div className="profile-field">
              <div className='password-label'>
                <label className="profile-label">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(prevState => ({
                    ...prevState,
                    wifiPassword: !prevState.wifiPassword
                  }))}
                  className="show-password-button"
                >
                  {showPassword.wifiPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword.wifiPassword ? "text" : "password"}
                name="pass"
                value={formData.pass}
                onChange={handleInputChange}
                disabled={!editable}
                className={`profile-input ${editable ? 'editable' : ''}`}
              />
            </div>
          </div>
        </div>
      </main>
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
}
