'use client'
import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 rounded-lg bg-indigo-100 text-indigo-600 font-medium">Profile</a>
          <a href="#" className="block py-2 px-4 rounded-lg hover:bg-gray-200">Security</a>
          <a href="#" className="block py-2 px-4 rounded-lg hover:bg-gray-200">Notifications</a>
          <a href="#" className="block py-2 px-4 rounded-lg hover:bg-gray-200">Preferences</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Account Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-medium text-gray-900">Profile Information</h2>
            <p className="text-gray-500 text-sm">Update your name, email, and profile picture.</p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200" placeholder="john@example.com" />
              </div>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-medium text-gray-900">Security</h2>
            <p className="text-gray-500 text-sm">Manage your password and authentication settings.</p>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium">New Password</label>
              <input type="password" className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200" placeholder="********" />
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Change Password</button>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-medium text-gray-900">Notifications</h2>
            <p className="text-gray-500 text-sm">Control your notification preferences.</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-700 font-medium">Email Notifications</span>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                className={`${emailNotifications ? "bg-indigo-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span className={`${emailNotifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
              </Switch>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-medium text-gray-900">Preferences</h2>
            <p className="text-gray-500 text-sm">Customize your experience.</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-700 font-medium">Dark Mode</span>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${darkMode ? "bg-indigo-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable dark mode</span>
                <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
