import { useParams, useOutletContext } from "remix";
import {
  DrawerFooter,
  DrawerHeader,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";

export default function Post() {
  const params = useParams();
  const { onClose } = useOutletContext<{ onClose: () => void }>();

  return (
    <>
      <DrawerCloseButton />
      <DrawerHeader>{params.postSlug}</DrawerHeader>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="blue">Save</Button>
      </DrawerFooter>
    </>
  );
}
