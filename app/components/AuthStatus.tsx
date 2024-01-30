import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <Skeleton height="2rem" width="2rem" circle={true} />;
  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Login</Link>;

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user!.image!}
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
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default AuthStatus;
