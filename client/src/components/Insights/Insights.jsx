import { useEffect, useState } from "react";
import api from "../../api/api.js";
import "./Insights.css";

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const Insights = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts?limit=3");
        if (isMounted) {
          setPosts(res.data?.data || []);
          setStatus("success");
        }
      } catch (error) {
        if (isMounted) setStatus("error");
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section section--alt" id="insights">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Latest Insights</p>
            <h2 className="section-heading">
              Stay up to date with tax & compliance news
            </h2>
            <p className="section-intro">
              Articles and updates on taxation, business registration,
              compliance and financial planning.
            </p>
          </div>
        </div>

        {status === "loading" && (
          <p className="insights-status">Loading the latest insights...</p>
        )}

        {status === "error" && (
          <p className="insights-status">
            We couldn't load insights right now. Please make sure the API server
            is running and seeded (see README).
          </p>
        )}

        {status === "success" && posts.length === 0 && (
          <p className="insights-status">
            No insights published yet. Check out the LinkedIn page instead -&gt;{" "}
            <a
              href="https://www.linkedin.com/in/canarendra-soni/"
              target="_blank"
              rel="noreferrer"
              style={{textDecoration: "underline", color: "#0077b5"}}
            >
              Narendra Soni on LinkedIn
            </a>
          </p>
        )}

        {status === "success" && posts.length > 0 && (
          <div className="insights-grid">
            {posts.map((post) => (
              <article className="insight-card" key={post._id}>
                <div className="insight-card__media" aria-hidden="true"></div>
                <div className="insight-card__body">
                  <div className="insight-card__meta">
                    <span>{post.category || "General"}</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a
                    className="insight-card__link"
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read More -&gt;
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Insights;
