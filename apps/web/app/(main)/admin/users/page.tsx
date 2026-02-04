"use client";

import { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";

type User = {
  id: string;
  full_name: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase
        .from<"profiles", User>("profiles")
        .select("*");
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded-lg hover:shadow-md transition flex justify-between"
            >
              <span>{user.full_name}</span>
              <span className="text-gray-500">{user.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
