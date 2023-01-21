import React from "react";
import { BackButton } from "components/BackButton";
import { Column, Row, useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";

function StudyList() {
  const studiesRef = collection(getFirestore(), "Studies");
  const studiesCollection = useFirestoreCollectionData(studiesRef);

  const [studies, setStudies] = React.useState([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (studiesCollection.data) {
      // console.log(studiesCollection.data);
      const newStudies: any = studiesCollection.data;

      setStudies(newStudies);
    }

    // getStudies().then((res) => {
    //   console.log('res: ', res)
    //   setStudies(res.data._embedded.studyList)
    // }, (err) => {
    //   console.log(err)
    // })
  }, [studiesCollection.data]);

  const data = React.useMemo(() => studies, [studies]);

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
        accessor: "procedure",
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

  const tableHooks: any = (hooks: any) => {
    hooks.visibleColumns.push((columns: Column[]) => [
      ...columns,
      {
        id: "Action",
        Header: "Acción",
        Cell: ({ row }: { row: Row }) => {
          return (
            <button
              onClick={() =>
                navigate("/StudyDetail", {
                  state: { studyId: row.values.id },
                })
              }
              className="underline text-tertiary font-bold"
              type="button"
            >
              Atender
            </button>
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
      <BackButton goTo={"/"} />
      <div className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Lista de Estudios</h3>
      </div>

      <div className="m-10">
        <table {...getTableProps()} className="w-full rounded-lg m-auto">
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-primary text-white"
                >
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()} className="p-3">
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
                  <tr
                    {...row.getRowProps()}
                    className="hover:shadow-tableRowShadow"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-5 border border-tertiary p-3"
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
