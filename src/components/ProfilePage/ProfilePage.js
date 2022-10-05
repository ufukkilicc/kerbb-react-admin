import React from "react";
import "./ProfilePage.scss";
import { Routes, Route } from "react-router-dom";
import ProfilePageNavbar from "./ProfilePageNavbar/ProfilePageNavbar";
import ProfilePageSettingsPage from "./ProfilePageSettingsPage/ProfilePageSettingsPage";
import { useEffect } from "react";
import { authProfile } from "../../features/auth/authAPI";
import { getCookie } from "../../helpers/authHelper";
import { useDispatch, useSelector } from "react-redux";
import { getAuthObject, updateAuthObject } from "../../features/auth/authSlice";
import PasswordUpdatePage from "./PasswordUpdatePage/PasswordUpdatePage";

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const token = getCookie("k_t");
      const authProfileResponse = await authProfile(token);
      dispatch(updateAuthObject(authProfileResponse.data));
    }
    fetchData();
  }, []);
  const authObject = useSelector(getAuthObject);
  return (
    <div className="profile-page-container">
      <ProfilePageNavbar />
      <Routes>
        <Route path="settings" element={<ProfilePageSettingsPage />} />
        <Route path="update-password" element={<PasswordUpdatePage />} />
        <Route path="*" element={<ProfilePageSettingsPage />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;
