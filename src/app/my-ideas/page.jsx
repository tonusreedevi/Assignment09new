"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import IdeaCard from "@/component/IdeaCard";

const MyIdeas = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIdeas = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/idea/user/${user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch ideas");
        }

        const data = await res.json();

        console.log("My Ideas:", data);

        setIdeas(data);
      } catch (error) {
        console.error("Failed to load my ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyIdeas();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">My Ideas</h1>

        <p className="mt-3 text-gray-500">
          Please login to see your ideas.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">
          My Ideas
        </h1>

        <p className="text-gray-500">
          Loading your ideas...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">
        My Ideas
      </h1>

      <p className="text-gray-500 mb-8">
        Ideas you have shared with the IdeaVault community.
      </p>

      {ideas.length === 0 ? (
        <div className="border border-gray-200 rounded-2xl bg-white p-8 text-center">
          <p className="text-gray-500">
            You haven't posted any ideas yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeas;