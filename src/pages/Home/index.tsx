import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { JwtPayload } from "jwt-decode";
import { useQuery } from "react-query";
import { getBlogPosts } from "../../services/blogPosts/blogPostsService";
import { CardList } from "../../components/home/CardList";
import { Box, Container } from "@mui/material";

const Home = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user } = context;
  const nameIdentifierKey = import.meta.env.VITE_NAMEIDENTIFIER_KEY;
  const { data, isLoading } = useQuery(["blogPosts"], getBlogPosts);
  console.log(data);
  console.log(user && user[nameIdentifierKey as keyof JwtPayload]);

  return isLoading ? (
    <div>looading</div>
  ) : (
    <Box className="pt-[100px]">
      <Container maxWidth="sm">
        <CardList data={data} />
      </Container>
    </Box>
  );
};

export default Home;
