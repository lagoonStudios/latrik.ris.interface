import React from "react";
import { BackButton } from "components/BackButton";
import { Column, Row, useTable } from "react-table";
import { Link } from "react-router-dom";

function StudyList() {
  const data = React.useMemo(
    () => [
      {
        col1: "123123asd",
        col2: "123567",
        col3: "Jhon Doe",
        col4: "En espera",
      },
      {
        col1: "qweasd1231",
        col2: "8759854",
        col3: "Pepito Perez",
        col4: "En espera",
      },
      {
        col1: "asdhlk123a",
        col2: "v88767812",
        col3: "Maria de La Caridad",
        col4: "En espera",
      },
      {
        col1: "asaoshdnkjzxcb",
        col2: "v123365",
        col3: "Juanita Barrio",
        col4: "En espera",
      },
    ],
    []
  );

  const columns: Column[] = React.useMemo(() => {
    return [
      {
        Header: "Estudio",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Doc de identidad",
        accessor: "col2",
      },
      {
        Header: "Nombre",
        accessor: "col3",
      },
      {
        Header: "Estatus",
        accessor: "col4",
      },
    ];
  }, []);

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: Column[]) => [
      ...columns,
      {
        id: "Action",
        Header: "Action",
        Cell: ({ row }: { row: Row }) => {
          return (
            <Link to={`/StudyResumen/${row.values.col1}/`}>
              <button className="underline text-blue font-bold" type="button">
                Atender
              </button>
            </Link>
          );
        },
      },
    ]);
  };

  const tableInstance = useTable({ columns, data }, tableHooks);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <BackButton />
      <div className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Lista de Estudios</h3>
      </div>

      <div className="m-10">
        <table {...getTableProps()} className="w-full rounded-lg">
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps()}
                        className="border border-lightGrey"
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-5 border border-lightGrey"
                          >
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudyList;
