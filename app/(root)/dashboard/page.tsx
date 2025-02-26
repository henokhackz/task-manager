'use client'
import { useState, useEffect } from "react";
import { ProjectTable } from "@/components/shared/table";
import UserCard from "@/components/shared/user-card";
import { useProject } from "@/hooks/use-project";
import { useUserId } from '../../../hooks/useUser';
import { getCount } from "@/lib/actions/user.actions";

export default function Page() {
  const { isLoading, projects } = useProject();
  const { userId } = useUserId();
  const [count, setCount] = useState({ projectCount: 0, taskCount: 0, noteCount: 0 });

  useEffect(() => {
    const fetchCount = async () => {
      if(!userId) return 
      const { success, data } = await getCount(userId);
      if (success && data) {
        setCount({ ...data });
      }
    };
    if (userId) {
      fetchCount();
    }
  }, [userId]);

  const userCardData = [
    {
      title: "Your Projects",
      count: count.projectCount,
      description: count.projectCount === 0 ? "You have no projects" : `${count.projectCount} project(s)`,
    },
    {
      title: "Your Tasks",
      count: count.taskCount,
      description: count.taskCount === 0 ? "You have no tasks" : `${count.taskCount} task(s)`,
    },
    {
      title: "Your Notes",
      count: count.noteCount,
      description: count.noteCount === 0 ? "You have no notes" : `${count.noteCount} note(s)`,
    },
  ];

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {userCardData.map((item) => (
          <UserCard key={item.title} {...item} description={item.description} />
        ))}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}
        {projects && !isLoading && <ProjectTable projects={projects} />}
      </div>
    </>
  );
}
