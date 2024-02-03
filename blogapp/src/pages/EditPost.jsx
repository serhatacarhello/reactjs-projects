import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, Loading, PostForm } from "../components";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    slug &&
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setLoading(false);
          setPost(post);
        } else {
          navigate("/");
        }
      });
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>{!loading ? <PostForm post={post} /> : <Loading />}</Container>
    </div>
  );
}
