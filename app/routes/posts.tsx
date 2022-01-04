import {
  Heading,
  List,
  ListItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
} from "@chakra-ui/react";
import {
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigate,
  useOutlet,
  useSearchParams,
} from "remix";
import { getPosts, Post } from "~/queries/posts/getPosts";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const author = url.searchParams.get("author");
  const posts = getPosts();
  return [posts, author];
};

export default function Posts() {
  const [posts, author] = useLoaderData<[Post[], any]>();
  const [searchParams] = useSearchParams();
  const authorAgain = searchParams.get("author");
  console.log("author :>> ", author, authorAgain);

  return (
    <>
      <Heading>Posts</Heading>
      <List>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </ListItem>
        ))}
      </List>
      <Input /> <Link to={"/dee"}>Fake Link</Link>
      <ModalOutlet />
    </>
  );
}

function ModalOutlet() {
  const childRoute = useOutlet();
  const isInChildROute = Boolean(childRoute);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Drawer isOpen={isInChildROute} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Outlet context={{ onClose }} />
      </DrawerContent>
    </Drawer>
  );
}
