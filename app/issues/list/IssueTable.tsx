import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

export interface IssueQuery {
  orderDirection: string;
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell" },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];

export default IssueTable;
