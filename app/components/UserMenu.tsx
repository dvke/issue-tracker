import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from ".";

const UserMenu = () => {
  const { status, data: session } = useSession();
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") setIsSessionLoading(false);
  }, [status]);

  return (
    <>
      {isSessionLoading ? (
        <Skeleton height="2rem" width="2rem" circle={true} />
      ) : (
        status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer mt-1"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href={"/api/auth/signout"}>Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )
      )}
      {}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
    </>
  );
};

export default UserMenu;
