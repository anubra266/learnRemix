import {
  Button,
  ButtonGroup,
  chakra,
  Checkbox,
  Heading,
  Input,
} from "@chakra-ui/react";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useSearchParams,
  useSubmit,
} from "remix";
import { Post } from "~/queries/posts/getPosts";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  return body.getAll("brand");
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const brands = useActionData<string[]>();
  console.log(brands);
  const submit = useSubmit();

  return (
    <>
      <Link to={"/posts?author=abraham"}>Posts by Abraham</Link>

      <chakra.div mt="8">
        You selected{" "}
        <ButtonGroup mt="8">
          {brands?.map((brand) => (
            <Button key={brand} colorScheme={"blue"}>
              {brand}
            </Button>
          ))}
        </ButtonGroup>
        <Form method="post" onChange={(e) => submit(e.currentTarget)} reloadDocument>
          <Checkbox
            type="checkbox"
            id="nike"
            name="brand"
            value="nike"
            defaultChecked={brands?.includes("nike")}
          >
            Nike
          </Checkbox>

          <Checkbox
            type="checkbox"
            id="adidas"
            name="brand"
            value="adidas"
            defaultChecked={brands?.includes("adidas")}
          >
            Adidas
          </Checkbox>
        </Form>
      </chakra.div>
    </>
  );
}
