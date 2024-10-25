'use client'

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  return (<>
    <Navbar dark title={"Profile"} />
    <main className="bg-[#00312d] text-white p-6">
      <div className="max-w-3xl mx-auto p-6 rounded-lg">
        <div className="flex justify-center mb-6">
          <div className="flex justify-center items-center bg-[#408819] border-4 border-[#5abe22] h-[120px] w-[120px] rounded-full">
            <i className="bi bi-person text-5xl text-white"></i>
          </div>
        </div>
        <div className="text-center mb-6">
          <button
            className="bg-[#5abe22] text-md text-white py-2 px-8 rounded-2xl cursor-pointer duration-200 hover:bg-[#408819]"
            onClick={() => {
              if (editable) handleSave();
              setEditable(!editable);
            }}
          >
            {editable ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border-t-2 border-[#486a67] pt-4 mt-6 text-lg">
            <p className="ml-2 font-bold text-[#ddd]">Pengaturan Akun</p>
          </div>
          <div className="flex flex-col text-white">
            <label className="mb-2 ml-3 text-[#a39b9a]">Owner</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              disabled={!editable}
              className={`input-profile ${editable ? 'border-[#6bab1f]' : ''}`}
            />
          </div>
          <div className="flex flex-col text-white">
            <label className="mb-2 ml-3 text-[#a39b9a]">Device ID</label>
            <input
              type="text"
              name="deviceId"
              value={formData.deviceId}
              disabled
              className="input-profile"
            />
          </div>
          <div className="flex flex-col text-white">
            <div className="flex justify-between">
              <label className="mb-2 ml-3 text-[#a39b9a]">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(prevState => ({
                  ...prevState,
                  accountPassword: !prevState.accountPassword
                }))}
                className="text-[#a39b9a] mr-3 cursor-pointer bg-transparent border-none outline-none"
              >
                {showPassword.accountPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword.accountPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              disabled={!editable}
              className={`input-profile ${editable ? 'border-[#6bab1f]' : ''}`}
            />
          </div>
          <div className="border-t-2 border-[#486a67] pt-4 mt-6 text-lg">
            <p className="ml-2 font-bold text-[#ddd]">Pengaturan Koneksi Wifi</p>
          </div>
          <div className="flex flex-col text-white">
            <label className="mb-2 ml-3 text-[#a39b9a]">SSID</label>
            <input
              type="text"
              name="ssid"
              value={formData.ssid}
              onChange={handleInputChange}
              disabled={!editable}
              className={`input-profile ${editable ? 'border-[#6bab1f]' : ''}`}
            />
          </div>
          <div className="flex flex-col text-white">
            <div className="flex justify-between">
              <label className="mb-2 ml-3 text-[#a39b9a]">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(prevState => ({
                  ...prevState,
                  wifiPassword: !prevState.wifiPassword
                }))}
                className="text-[#a39b9a] mr-3 cursor-pointer bg-transparent border-none outline-none"
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
              className={`input-profile ${editable ? 'border-[#6bab1f]' : ''}`}
            />
          </div>
        </div>
      </div>
    </main>
    <LoadingOverlay isLoading={isLoading} />
  </>
  );
}
