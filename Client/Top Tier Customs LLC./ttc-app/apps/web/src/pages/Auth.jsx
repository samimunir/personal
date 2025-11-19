import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Phone,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPages() {
  const [authMode, setAuthMode] = useState("login"); // 'login', 'register', 'forgot-password', 'reset-password'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");

  // Reset password state
  const [resetData, setResetData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(loginData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token - Note: localStorage is not supported in Claude artifacts
        // In production, you would do: localStorage.setItem('token', data.token);

        setSuccess("Login successful! Redirecting...");

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          // window.location.href = '/dashboard';
          alert(
            "Login successful! In production, this would redirect to dashboard."
          );
        }, 1500);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      // For demo purposes, show success message
      setSuccess("Login successful! (Demo mode - API not connected)");
      console.log("Demo login with:", loginData.email);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(registerData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(registerData.password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          phone: registerData.phone,
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Please log in.");

        // Switch to login after 2 seconds
        setTimeout(() => {
          setAuthMode("login");
          setLoginData({ ...loginData, email: registerData.email });
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      // For demo purposes
      setSuccess(
        "Account created successfully! (Demo mode - API not connected)"
      );
      setTimeout(() => {
        setAuthMode("login");
        setLoginData({ email: registerData.email, password: "" });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!forgotEmail) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(forgotEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset instructions have been sent to your email.");
        setTimeout(() => {
          setAuthMode("reset-password");
        }, 2000);
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setSuccess("Reset instructions sent! (Demo mode - Check email for code)");
      setTimeout(() => {
        setAuthMode("reset-password");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (
      !resetData.code ||
      !resetData.newPassword ||
      !resetData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!validatePassword(resetData.newPassword)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: resetData.code,
          newPassword: resetData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Password reset successful! Please log in with your new password."
        );
        setTimeout(() => {
          setAuthMode("login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setSuccess("Password reset successful! (Demo mode)");
      setTimeout(() => {
        setAuthMode("login");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-600 rounded-full animate-pulse"
                style={{
                  width: Math.random() * 4 + 1 + "px",
                  height: Math.random() * 4 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: Math.random() * 3 + 2 + "s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block cursor-pointer">
            <div className="text-5xl font-black mb-2">
              <span className="text-white">TT</span>
              <span className="text-red-600">C</span>
            </div>
            <p className="text-sm text-gray-400">TOP TIER CUSTOMS</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800 p-8 shadow-2xl">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 bg-red-600/10 border border-red-600/30 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-600/10 border border-green-600/30 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Login Form */}
          {authMode === "login" && (
            <>
              <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
              <p className="text-gray-400 mb-8">
                Sign in to your account to continue
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="your@email.com"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="Enter your password"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-red-600"
                    />
                    <span className="text-gray-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot-password")}
                    className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Register Form */}
          {authMode === "register" && (
            <>
              <h2 className="text-3xl font-black mb-2">Create Account</h2>
              <p className="text-gray-400 mb-8">Join Top Tier Customs today</p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={registerData.firstName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="John"
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Doe"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      placeholder="your@email.com"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+44 7700 900000"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      placeholder="Minimum 8 characters"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm your password"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  By creating an account, you agree to our Terms of Service and
                  Privacy Policy
                </div>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Forgot Password Form */}
          {authMode === "forgot-password" && (
            <>
              <h2 className="text-3xl font-black mb-2">Forgot Password?</h2>
              <p className="text-gray-400 mb-8">
                Enter your email to receive reset instructions
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleForgotPassword()
                      }
                      placeholder="your@email.com"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            </>
          )}

          {/* Reset Password Form */}
          {authMode === "reset-password" && (
            <>
              <h2 className="text-3xl font-black mb-2">Reset Password</h2>
              <p className="text-gray-400 mb-8">
                Enter the code from your email and create a new password
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Reset Code
                  </label>
                  <input
                    type="text"
                    value={resetData.code}
                    onChange={(e) =>
                      setResetData({ ...resetData, code: e.target.value })
                    }
                    placeholder="Enter 6-digit code"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={resetData.newPassword}
                      onChange={(e) =>
                        setResetData({
                          ...resetData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Minimum 8 characters"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={resetData.confirmPassword}
                      onChange={(e) =>
                        setResetData({
                          ...resetData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm your new password"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span onClick={() => navigate("/")}>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
