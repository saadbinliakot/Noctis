import { useEffect, useState } from "react";

interface Tag {
  _id: string;
  count: number;
}

const TrendingTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/trending-tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>🔥 Trending Tags</h2>

      {tags.length === 0 ? (
        <p style={{ color: "gray" }}>No trending tags</p>
      ) : (
        tags.map((tag, index) => (
          <div
            key={index}
            style={{
              background: "#222",
              color: "white",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            #{tag._id} ({tag.count})
          </div>
        ))
      )}
    </div>
  );
};

export default TrendingTags;