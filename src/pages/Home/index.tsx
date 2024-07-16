import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { JwtPayload } from "jwt-decode";
import { useQuery } from "react-query";
import { getBlogPosts } from "../../services/blogPosts/blogPostsService";

const Home = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user } = context;
  const nameIdentifierKey = import.meta.env.VITE_NAMEIDENTIFIER_KEY;
  const query = useQuery(["blogPosts"],getBlogPosts)
  console.log(query)
  console.log(user&&user[nameIdentifierKey as keyof JwtPayload])
  return (
    <div>Home</div>
  )
}

export default Home