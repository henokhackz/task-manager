'use client'
import { useEffect, useState } from "react";
import { useUserId } from "../../../hooks/useUser";
import { getUserDetails } from "@/lib/actions/user.actions";
import Loader from "@/components/loader";
import { User } from "@prisma/client";
import { getCount } from "@/lib/actions/user.actions";

export default function ProfilePage() {
  const { userId } = useUserId();
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState<{ projectCount: number; taskCount: number; noteCount: number } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        setIsLoading(true)
        const { success, data } = await getUserDetails(userId);
        if (success && data) {
          setUser(data);
          setIsLoading(false)
        }
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(()=>{
    if(!userId)return 
    setIsLoading(true)
    const fetchCount = async () => {
      const { success, data } = await getCount(userId);
      if (success && data) {
        setCount({ ...data });
        setIsLoading(false)
      }
    };
    if (userId) {
      fetchCount();

    }
    setIsLoading(false)
  }, [userId])

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
       <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
            src={user.image || '/avatar.webp'}
            alt="Profile Picture"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user?.emailVerified ? 'Email verified' : 'Email not verified'}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">About</h2>
          <p className="text-gray-600">{ "No bio available."}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-indigo-100 shadow-md">
            <div className="p-3 rounded-full bg-indigo-500 text-white">
              <i className="fas fa-tasks"></i>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Projects</h3>
              <p className="text-lg text-gray-600">{count?.projectCount} Projects</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-indigo-100 shadow-md">
            <div className="p-3 rounded-full bg-indigo-500 text-white">
              <i className="fas fa-check"></i>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Tasks</h3>
              <p className="text-lg text-gray-600">{count?.taskCount} Tasks</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-indigo-100 shadow-md">
            <div className="p-3 rounded-full bg-indigo-500 text-white">
              <i className="fas fa-sticky-note"></i>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Notes</h3>
              <p className="text-lg text-gray-600">{count?.noteCount} Notes</p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Info</h2>
          <div className="flex flex-col space-y-2">
            
            <div className="flex items-center space-x-3">
              <i className="fas fa-envelope text-indigo-500"></i>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
