import React, { useState, useEffect } from "react";
import { fetchPosts, fetchUsers } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import PostCard from "../PostCard/PostCard";
import "./PostList.css";
import { useTranslation } from "react-i18next";

const PostList = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);

        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAndSortedPosts = posts
    .filter((post) => {
      const user = users.find((user) => user.id === post.userId);
      if (!user) return false;

      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const displayedPosts = filteredAndSortedPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < filteredAndSortedPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts((prev) =>
      Math.min(prev + 10, filteredAndSortedPosts.length)
    );
  };

  if (loading) return <div className="loading">{t("common.loading")}</div>;

  return (
    <div className="post-list-container">
      <h1>{t("posts.title")}</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        placeholder={t("posts.search")}
        sortOptions={[
          { value: "title-asc", label: t("posts.titleAsc") },
          { value: "title-desc", label: t("posts.titleDesc") },
          { value: "id-asc", label: t("posts.idAsc") },
          { value: "id-desc", label: t("posts.idDesc") },
        ]}
      />

      <div className="posts-grid">
        {displayedPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          return (
            <PostCard
              key={post.id}
              post={post}
              userName={user ? user.name : "Unknown User"}
            />
          );
        })}
      </div>

      {hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {displayedPosts.length === 0 && searchTerm && (
        <div className="no-results">No posts found for "{searchTerm}"</div>
      )}
    </div>
  );
};

export default PostList;
