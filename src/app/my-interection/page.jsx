"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import IdeaCard from "@/component/IdeaCard";

const MyInteraction = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInteractions = async () => {
      if (!user?.id) return;

      try {
        // 1. Get comments made by current user
        const commentsRes = await fetch(
          `http://localhost:5000/comment/user/${user.id}`
        );

        const comments = await commentsRes.json();

        console.log("My comments:", comments);

        // 2. Get unique idea IDs
        const ideaIds = [
          ...new Set(comments.map((comment) => comment.ideaId)),
        ];

        console.log("Idea IDs:", ideaIds);

        // 3. Get all ideas
        const ideasRes = await fetch(
          "http://localhost:5000/idea"
        );

        const allIdeas = await ideasRes.json();

        // 4. Only keep ideas where current user commented
        const myInteractionIdeas = allIdeas.filter((idea) =>
          ideaIds.includes(idea._id)
        );

        setIdeas(myInteractionIdeas);
      } catch (error) {
        console.error(
          "Failed to load my interactions:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyInteractions();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">
          My Interaction
        </h1>

        <p className="text-gray-500 mt-3">
          Please login to see your interactions.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">
          My Interaction
        </h1>

        <p className="text-gray-500">
          Loading your interactions...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">
        My Interaction
      </h1>

      <p className="text-gray-500 mb-8">
        Ideas you have commented on.
      </p>

      {ideas.length === 0 ? (
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
          <p className="text-gray-500">
            You havent commented on any ideas yet.
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

export default MyInteraction;