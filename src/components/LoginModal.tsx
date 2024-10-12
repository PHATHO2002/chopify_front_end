import { FC, FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogin, updateModal } from "../redux/features/authSlice";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { register, login } from "../api/index";
import axios from 'axios';

const LoginModal: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(""); // State cho thông báo
  const [successMessage, setSuccessMessage] = useState(""); // State cho thông báo thành công
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State cho ảnh
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.authReducer.modalOpen);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Bắt đầu loading
    setNotification(""); // Reset thông báo trước khi gửi
    setSuccessMessage(""); // Reset thông báo thành công trước khi gửi

    if (userName === "" || password === "") {
      setNotification("Thiếu userName hoặc mật khẩu"); // Thông báo lỗi chung
      setIsSubmitting(false); // Kết thúc loading
      return;
    }

    try {
      const respone = await login({ userName, password });

      if (respone.data) {
        let accessToken = respone.data.accessToken;
        let refreshToken = respone.data.refreshToken;

        dispatch(doLogin({ accessToken, refreshToken }));
        setSuccessMessage("Đăng nhập thành công!"); // Thông báo thành công
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response;
        if (errorResponse) {
          setNotification(errorResponse.data.message || "Có lỗi xảy ra!"); // Hiển thị thông báo lỗi cụ thể
        } else {
          setNotification("Có lỗi xảy ra!"); // Thông báo lỗi chung
        }
      } else {
        setNotification("Có lỗi xảy ra! Vui lòng thử lại."); // Thông báo lỗi chung
      }
    } finally {
      setIsSubmitting(false); // Kết thúc loading
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]); // Cập nhật file đã chọn
    }
  };

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Bắt đầu loading
    setNotification(""); // Reset thông báo trước khi gửi
    setSuccessMessage(""); // Reset thông báo thành công trước khi gửi

    if (userName === "" || password === "") {
      setNotification("Thiếu userName hoặc mật khẩu"); // Thông báo lỗi chung
      setIsSubmitting(false); // Kết thúc loading
      return;
    }

    if (password === confirmPassword) {
      try {
        const response = await register({ userName, password, avatar: selectedFile });
        setSuccessMessage(response.message); // Thông báo thành công từ server
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response;
          if (errorResponse) {
            setNotification(errorResponse.data.message || "Có lỗi xảy ra!"); // Hiển thị thông báo lỗi cụ thể
          } else {
            setNotification("Có lỗi xảy ra!"); // Thông báo lỗi chung
          }
        } else {
          setNotification("Có lỗi xảy ra! Vui lòng thử lại."); // Xử lý lỗi chung
        }
      }
    } else {
      setNotification("Mật khẩu nhập lại không đúng"); // Thông báo lỗi chung
    }

    setIsSubmitting(false); // Kết thúc loading
  };

  if (open) {
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
        <div
          className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40 dark:bg-slate-800 dark:text-white"
          data-test="login-container"
        >
          <RxCross1
            className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
            onClick={() => { dispatch(updateModal(false)); setNotification(""); setSuccessMessage(""); }}
          />
          {clicked ? (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <GiArchiveRegister />
                <h3 className="font-bold text-center text-xl">Register</h3>
                <GiArchiveRegister />
              </div>
              <form onSubmit={submitRegister} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your userName here..."
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Your password here..."
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="loader"></div> {/* Hiển thị spinner */}
                      <span className="ml-2">Đang đăng ký...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p> // Hiển thị thông báo thành công
              )}
              {notification && (
                <p className="text-red-500 text-center">{notification}</p> // Hiển thị thông báo lỗi
              )}
              <p className="text-center mt-1">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => { setClicked(false); setNotification(""); setSuccessMessage(""); }}
                >
                  Go to login
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <FaUnlock />
                <h3 className="font-bold text-center text-2xl">Login</h3>
                <FaUnlock />
              </div>
              <form onSubmit={submitForm} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your userName here... (atuny0)"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password here... (9uQFF1Lh)"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="loader"></div> {/* Hiển thị spinner */}
                      <span className="ml-2">Đang đăng nhập...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p> // Hiển thị thông báo thành công
              )}
              {notification && (
                <p className="text-red-500 text-center">{notification}</p> // Hiển thị thông báo lỗi
              )}
              <p className="text-center mt-1">
                No Account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => { setClicked(true); setNotification(""); setSuccessMessage(""); }}
                >
                  Register
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
  return null; // Trả về null nếu modal không mở
};

export default LoginModal;
