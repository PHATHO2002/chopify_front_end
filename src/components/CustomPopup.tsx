import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  MdFavoriteBorder,
  MdOutlineAccountCircle,
  MdOutlineLogout,
} from "react-icons/md";
import { doLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import { logout, refreshAccessToken } from "../api/index";
import axios from 'axios';

const CustomPopup: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setVisible] = useState(false);
  const userData = useAppSelector((state) => state.authReducer.userData);
  let userName = "";

  if (userData) {
    userName = userData.userName;

  }

  const handlePopup = () => {
    setVisible((v) => !v);
  };

  const handleLogout = async () => {
    try {


      await logout();

      dispatch(doLogout());


      hidePopup();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Bạn có thể lấy thông tin từ response

        // Kiểm tra xem errorResponse có tồn tại không
        if (error.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();
            localStorage.setItem('accessToken', newAccessToken);
            await logout();
            dispatch(doLogout());

          } catch (error) {
            console.log("check", error)
          }

        } else {
          console.log("check1", error); // Thông báo lỗi chung
        }

      } else {
        console.log("check2", error)
      }
    }
  };

  const hidePopup = () => {
    setVisible(false);
  };

  return (
    <div className="relative font-karla">
      <div
        className="inline-block cursor-pointer hover:opacity-85 dark:text-white"
        onClick={handlePopup}
        data-test="username-popup"
      >
        {userName}
      </div>
      {isVisible && (
        <div
          className="absolute p-4 left-[-50px] w-40 z-50 mt-2 rounded-md shadow-2xl bg-white ring-1 transition-all ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 dark:text-white"
          data-test="popup-content-list"
        >
          <table>
            <tbody>
              <tr>
                <td className="text-center">
                  <MdOutlineAccountCircle />
                </td>
                <td className="hover:underline cursor-pointer text-lg pl-2">
                  <Link to="/account" onClick={hidePopup}>
                    Account
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <MdFavoriteBorder />
                </td>
                <td
                  className="hover:underline cursor-pointer text-lg pl-2"
                  data-test="wishlist-container"
                >
                  <Link to="/wishlist" onClick={hidePopup}>
                    Wishlist
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <MdOutlineLogout />
                </td>
                <td
                  className="hover:underline cursor-pointer text-lg pl-2"
                  onClick={handleLogout}
                  data-test="logout-btn"
                >
                  Logout
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomPopup;
