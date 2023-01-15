import React from "react";
import { BackButton } from "components/BackButton";
import { Column, Row, useTable } from "react-table";
import { Link } from "react-router-dom";
import {
  Modality,
  Status,
  StudyPriority,
} from "../../models/latrikModels";

function StudyList() {
  const data = React.useMemo(
    () => [
      {
        id: "12317asndkj",
        name: "Jhon Doe",
        patientId: "1239712",
        studyDate: "12/12/22",
        modality: Modality[0],
        process: 'Proceso1',
        status: Status[1],
        priority: StudyPriority[2],
      },
      {
        id: "12317asndkj",
        name: "Jhon Doe",
        patientId: "1239712",
        studyDate: "12/12/22",
        modality: Modality[0],
        process: 'Proceso1',
        status: Status[1],
        priority: StudyPriority[2],
      },
      {
        id: "12317asndkj",
        name: "Jhon Doe",
        patientId: "1239712",
        studyDate: "12/12/22",
        modality: Modality[0],
        process: 'Proceso1',
        status: Status[1],
        priority: StudyPriority[2],
      },
    ],
    []
  );

  const columns: Column[] = React.useMemo(() => {
    return [
      {
        Header: "id",
        accessor: "id",
        show: false,
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Doc de identidad",
        accessor: "patientId",
      },
      {
        Header: "Fecha del estudio",
        accessor: "studyDate",
      },
      {
        Header: "Modalidad",
        accessor: "modality",
      },
      {
        Header: "Procedimiento",
        accessor: "process",
      },
      {
        Header: "Estatus",
        accessor: "status",
      },
      {
        Header: "Prioridad",
        accessor: "priority",
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
            <Link to={`/StudyResumen/${row.values.id}/`}>
              <button className="underline text-blue font-bold" type="button">
                Atender
              </button>
            </Link>
          );
        },
      },
    ]);
  };

  const tableInstance = useTable(
    { columns, data, initialState: { hiddenColumns: ["id"] } },
    tableHooks
  );

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
                        className="border border-lightGrey p-3"
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
                            className="px-5 border border-lightGrey p-3"
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
