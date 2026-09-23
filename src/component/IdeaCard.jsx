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

  // Handle tags whether it is an array or string
  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="group overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300">

      {/* =========================
          IMAGE
      ========================== */}

      <div className="relative h-[220px] w-full overflow-hidden bg-slate-100">

        <Image
          src={imageUrl}
          alt={title || "Idea image"}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}

        <div className="absolute left-4 top-4">

          <span className="bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-800 shadow-sm">
            {category || "General"}
          </span>

        </div>

      </div>


      {/* =========================
          CONTENT
      ========================== */}

      <div className="flex min-h-[290px] flex-col p-6">

        {/* Title */}

        <h2 className="line-clamp-2 text-xl font-semibold leading-7 tracking-[-0.02em] text-slate-950">
          {title || "Untitled Idea"}
        </h2>


        {/* Target Audience */}

        <div className="mt-5">

          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-700">
            Target Audience
          </p>

          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
            {tergetAudience || "Not specified"}
          </p>

        </div>


        {/* Tags */}

        <div className="mt-5">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Tags
          </p>

          {tagList.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {tagList.slice(0, 4).map((tag, index) => (

                <span
                  key={index}
                  className="border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
                >
                  #{tag}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-400">
              No tags
            </p>

          )}

        </div>


        {/* =========================
            BUTTON
        ========================== */}

        <div className="mt-auto pt-6">

          <Link
            href={`/ideas/${_id}`}
            className="flex h-11 w-full items-center justify-center gap-2 bg-slate-950 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            View Details

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

      </div>

    </article>
  );
};

export default IdeaCard;