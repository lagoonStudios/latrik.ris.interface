import { BackButton } from "components/BackButton";
import React from "react";
import { Link } from "react-router-dom";
import { Column, Row, useTable } from "react-table";

function PatientList() {
  const data = React.useMemo(
    () => [
      {
        id: "123123asd",
        name: "Jhon Doe",
        gender: "Hombre",
        birthDate: '30-12-22'
      },
      {
        id: "8879651",
        name: "Maria",
        gender: "Mujer",
        birthDate: '30-12-22'
      },
      {
        id: "5624752",
        name: "Jhon Doe",
        gender: "Hombre",
        birthDate: '30-12-22'
      },
      {
        id: "4149871",
        name: "Maria",
        gender: "Mujer",
        birthDate: '30-12-22'
      },
    ],
    []
  );

  const columns: Column[] = React.useMemo(() => {
    return [
      {
        Header: "Doc. de identidad",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Genero",
        accessor: "gender",
      },
      {
        Header: "Fecha de nacimiento",
        accessor: "birthDate",
      },
    ];
  }, []);

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: Column[]) => [
      ...columns,
      {
        id: "Action",
        Header: "Acción",
        Cell: ({ row }: { row: Row }) => {
          return (
            <Link to={`/StudyResumen/${row.values.col1}/`}>
              <button className="underline text-blue font-bold" type="button">
                Crear estudio
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
      <div className="mx-6 mb-6 flex justify-between">
        <h3 className="font-bold text-4xl">Lista de Pacientes</h3>
        <button className="filledTertiary rounded-xl w-44 h-12" type="button">
          Registrar paciente
        </button>
      </div>

      <div className="m-10">
        <table {...getTableProps()} className="w-full rounded-lg">
          <thead className="h-8">
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

export default PatientList;
