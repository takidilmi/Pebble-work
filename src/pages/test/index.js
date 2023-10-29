import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/util/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import OtpInput from "@/components/OtpVerification";
const App = () => {
    const [otp, setOtp] = useState("");
    const [pn, setPn] = useState(""); //phone number
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    function onCaptchaVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => {},
                },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + pn;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
                console.log("verified");
            })
            .catch((err) => {
                console.log("wrong OTP input");
                setLoading(false);
            });
    }

    return (
        <>
            <section className='bg-[#FDA855] bg-opacity-50 flex items-center justify-center h-screen'>
                <div>
                    <Toaster toastOptions={{ duration: 4000 }} />
                    <div id='recaptcha-container'></div>
                    {user ? (
                        <h2 className='text-center text-white font-medium text-2xl'>
                            👍 Login Success
                        </h2>
                    ) : (
                        <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                            <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                                Verify your phone number before you can create
                                an event
                            </h1>
                            {showOTP ? (
                                <>
                                    <div className='bg-white text-orange-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsFillShieldLockFill size={30} />
                                    </div>
                                    <label
                                        htmlFor='otp'
                                        className='font-bold text-xl text-white text-center'
                                    >
                                        Enter your OTP
                                    </label>

                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        length={6}
                                    />
                                    <button
                                        onClick={onOTPVerify}
                                        className='bg-[#FDA855] hover:bg-orange-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                                    >
                                        {loading && (
                                            <CgSpinner
                                                size={20}
                                                className='mt-1 animate-spin'
                                            />
                                        )}
                                        <span>Verify OTP</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className='bg-white text-orange-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsTelephoneFill size={30} />
                                    </div>
                                    <label
                                        htmlFor=''
                                        className='font-bold text-xl text-white text-center'
                                    >
                                        Verify your phone number
                                    </label>
                                    <PhoneInput
                                        country={"dz"}
                                        value={pn}
                                        onChange={setPn}
                                    />
                                    <button
                                        onClick={onSignup}
                                        className='bg-[#FDA855] hover:bg-orange-700 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                                    >
                                        {loading && (
                                            <CgSpinner
                                                size={20}
                                                className='mt-1 animate-spin'
                                            />
                                        )}
                                        <span>Send code via SMS</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default App;
