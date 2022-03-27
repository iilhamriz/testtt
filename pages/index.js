import React from "react";
import { FeaturedPosts } from "../sections/index";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Box, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});


export default function Home() {
  // Get Current Posts
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  // Change Page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await getPosts()) || [];
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <title>Ilham Blog</title>
      <link rel="icon" href="/favicon.ico" />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {currentPosts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
          <ThemeProvider theme={darkTheme}>
        <Box display={{ xs: 'block', md: 'none' }}>
            <Pagination
              count={pageNumbers.length}
              onChange={(e) => setCurrentPage(e.target.textContent)}
            />
        </Box>
          </ThemeProvider>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
        <ThemeProvider theme={darkTheme}>
      <Box display={{ xs: 'none', md: 'block' }}>
          <Pagination
            count={pageNumbers.length}
            onChange={(e) => setCurrentPage(e.target.textContent)}
          />
      </Box>
        </ThemeProvider>
    </div>
  );
}
