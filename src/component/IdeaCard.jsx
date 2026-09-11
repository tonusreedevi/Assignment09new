
// const IdeaCard = ({idea}) => {
//     const {imageUrl , title , tags , category ,tergetAudience } = idea
//   return (
//     <div>
//       <Image
//       className=""
//         alt={title}
//         src={imageUrl}
//         height={400}
//         width={480}
       
//        />
//     </div>
//   )
// }

// export default IdeaCard

import Image from "next/image";
import Link from "next/link";

const IdeaCard = ({ idea }) => {
  const {
    _id,
    imageUrl,
    title,
    tags,
    category,
    tergetAudience,
  } = idea;

  // Handle tags whether it is an array or a string
  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  return (
    <div className="w-[400px] h-[480px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative w-full h-[220px]">
        <Image
          src={imageUrl}
          alt={title || "Idea image"}
          fill
          className="object-cover"
        />

        {/* Category */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 h-[260px] flex flex-col">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
          {title}
        </h2>

        {/* Target Audience */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Target Audience
          </p>

          <p className="text-sm text-gray-700 line-clamp-2">
            {tergetAudience || "Not specified"}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Tags
          </p>

          <div className="flex flex-wrap gap-2">
            {tagList.length > 0 ? (
              tagList.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">
                No tags
              </span>
            )}
          </div>
        </div>

        {/* Button */}
            <Link href={`/ideas/${_id}`}>
        <button className="mt-auto w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition">
            View Details
        </button>
             </Link>

      </div>
    </div>
  );
};

export default IdeaCard;