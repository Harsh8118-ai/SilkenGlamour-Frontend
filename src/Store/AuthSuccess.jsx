import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ConfirmationModalAddress from "../components/Profile/ConfirmationModalAddress";
import ConfirmationModalMobile from "../components/Profile/ConfirmationModalMobile"; // 👈 import mobile modal
import { useAuth } from "./auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuthSuccess = () => {
  const { storeTokenInLS } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));


  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    const username = searchParams.get("username");

    if (tokenFromURL) {
      try {
        // localStorage.setItem("token", tokenFromURL);
        storeTokenInLS(tokenFromURL);
        setToken(tokenFromURL);
        const decoded = jwtDecode(tokenFromURL);
        const userId = decoded.id;
        localStorage.setItem("userId", userId);
        setUser({ id: userId, username });

        // Step 1: Fetch full user data
        axios
          .get(`${BASE_URL}/auth/user`, {
            headers: {
              Authorization: `Bearer ${tokenFromURL}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const userData = res?.data?.userData;

            if (!userData) {
              console.warn("⚠️ No user data returned");
              navigate("/");
              return;
            }

            // Step 2: Redirect if admin
            if (userData?.isAdmin) {
              navigate("/admin");
              return;
            }

            // Step 3: Check for mobile number
            const mobileMissing = !userData.mobileNumber || userData.mobileNumber.length < 8;
            if (mobileMissing) {
              setShowMobileModal(true);
              return;
            }

            // Step 4: Check for address
            const { street, town, pincode } = userData;
            const addressIncomplete =
              !street || !town || !pincode ||
              [street, town, pincode].some((val) => val === "" || val === "000000");

            if (addressIncomplete) {
              setShowAddressModal(true);
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user:", err);
            navigate("/");
          });
      } catch (err) {
        console.error("❌ Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      console.warn("⚠ No token found");
      navigate("/");
    }
  }, [searchParams, navigate]);

  const handleMobileSaved = () => {
  axios
    .get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const userData = res?.data?.userData;
      const { street, town, pincode } = userData;

      const addressIncomplete =
        !street || !town || !pincode ||
        [street, town, pincode].some((val) => val === "" || val === "000000");

      setShowMobileModal(false); // ✅ always hide mobile modal

      if (addressIncomplete) {
        setShowAddressModal(true); // ✅ show address modal
      } else {
        navigate("/"); // ✅ done with both
      }
    })
    .catch((err) => {
      console.error("Error after saving mobile:", err);
      navigate("/");
    });
};

  return (
    <div className="bg-MainBGColorYellow">
      {/* Show Mobile Modal first if needed */}
      <ConfirmationModalMobile
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        userId={user?.id}
        onMobileSaved={handleMobileSaved}
      />

      {/* Show Address Modal only after mobile */}
      <ConfirmationModalAddress
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          navigate("/");
        }}
        userId={user?.id}
        onAddressSaved={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default AuthSuccess;
