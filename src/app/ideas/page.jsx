// // import IdeaCard from "@/component/IdeaCard"


// // const IdeaPage = async () => {
// //    const res =  await fetch('http://localhost:5000/idea')
// //    const ideas = await res.json()

// //     return (
// //     <div>
// //       ideas.map(idea => <IdeaCard key = {idea._id} idea={idea} />)
// //     </div>
// //   )
// // }

// // export default IdeaPage

// import IdeaCard from "@/component/IdeaCard";

// const IdeaPage = async () => {
//   const res = await fetch("http://localhost:5000/idea");

//   const ideas = await res.json();
//     console.log("IDEAS:", ideas);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       <h1 className="text-3xl font-bold mb-8">
//         Explore Ideas
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {ideas.map((idea) => (
//           <IdeaCard
//             key={idea._id}
//             idea={idea}
//           />
//         ))}
//       </div>

//     </div>
//   );
// };

// export default IdeaPage;


import IdeaCard from "@/component/IdeaCard";

const IdeaPage = async () => {
  const res = await fetch("http://localhost:5000/idea");

  const ideas = await res.json();

  console.log("IDEAS:", ideas);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Explore Ideas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea._id}
            idea={idea}
          />
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;