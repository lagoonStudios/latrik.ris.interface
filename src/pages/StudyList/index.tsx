import React from "react";
import { BackButton } from "components/BackButton";
import { Column, Row, useTable } from "react-table";
import { Link } from "react-router-dom";
import {
  Modality,
  Status,
  StudyPriority,
} from "../../models/latrikModels";
import { getStudies } from "api/studiesApi";

function StudyList() {
  const [studies, setStudies] = React.useState([])

  React.useEffect(() => {
    getStudies().then((res) => {
      console.log('res: ', res)
      setStudies(res.data._embedded.studyList)
    }, (err) => {
      console.log(err)
    })
  }, [])

  const data = React.useMemo(
    () => studies,
    [studies]
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
        accessor: "patient.name",
      },
      {
        Header: "Doc de identidad",
        accessor: "patient.patientId",
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
