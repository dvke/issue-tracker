import { IssueStatusBadge } from "@/app/components";
import Link from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    orderDirection: string;
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={columns.indexOf(column)}
                className={column.className}
              >
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      orderDirection:
                        searchParams.orderDirection === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon
                    className={`inline transition-all  ${
                      searchParams.orderDirection === "asc"
                        ? ""
                        : "rotate-180 transition-all"
                    }`}
                  />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`${issue.id}`}>{issue.title}</Link>

                <div className="block sm:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
