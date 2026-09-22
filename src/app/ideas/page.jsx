import IdeaCard from "@/component/IdeaCard";

const IdeaPage = async () => {
  const res = await fetch("http://localhost:5000/idea", {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">
          Failed to load ideas
        </h1>
      </div>
    );
  }

  const ideas = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Explore Ideas
      </h1>

      {ideas.length === 0 ? (
        <div className="border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-500">
            No ideas available yet.
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

export default IdeaPage;