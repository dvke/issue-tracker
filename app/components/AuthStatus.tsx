import {
  AlertDialog,
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <Skeleton height="2rem" width="2rem" circle={true} />;
  if (status === "unauthenticated")
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Login
      </Button>
    );

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer mt-1"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user!.email}</Text>
          </DropdownMenu.Label>
          {/* signout dialog */}
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button variant="outline">Log out</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Confirm Sign out</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to Sign out?
              </AlertDialog.Description>
              <Flex mt="4" gap="3">
                <AlertDialog.Cancel>
                  <Button color="gray" variant="soft">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    color="red"
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000/" })
                    }
                  >
                    Sign Out
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default AuthStatus;
