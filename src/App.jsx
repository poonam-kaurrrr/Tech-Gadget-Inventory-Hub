import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { createPaginatedRowModel, flexRender, rowPaginationFeature, tableFeatures, useTable, } from "@tanstack/react-table";

const columns = [
  { accessorKey: "gadgetName", header: "Gadget Name" },
  { accessorKey: "categoryType", header: "Category" },
  { accessorKey: "techBrand", header: "Tech Brand" },
  { accessorKey: "role", header: "User Role" },
  { accessorKey: "manufacturerName", header: "Manufacturer" },
  { accessorKey: "healthRate", header: "Health Rating" },
];

const tableSet = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

function App() {
  const [gadgetName, setGadgetName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [healthRate, setHealthRate] = useState("");
  const [techBrand, setTechBrand] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [role, setRole] = useState("");

  const [gadgetNameError, setGadgetNameError] = useState("");
  const [categoryTypeError, setCategoryTypeError] = useState("");
  const [manufacturerNameError, setManufacturerNameError] = useState("");
  const [healthRateError, setHealthRateError] = useState("");
  const [techBrandError, setTechBrandError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [gadgets, setGadgets] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [chosenGadget, setChosenGadget] = useState(null);
  const [actGadget, setActGadget] = useState(null);
  const [roleFilter, setRoleFilter] = useState("All");

  let filteredGadgets = gadgets;

  if (roleFilter !== "All") {
    filteredGadgets = gadgets.filter(function (gadget) {
      return gadget.role === roleFilter;
    });
  }

   useEffect(
    function () {
      if (chosenGadget !== null) {
        setActGadget(chosenGadget);
      }
    },
    [chosenGadget],
  );

  const table = useTable({
    data: filteredGadgets,
    columns: columns,
    features: tableSet,
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });


  function handleGadgetName(event) {
    const value = event.target.value;
    setGadgetName(value);
    if (value.trim() === "") {
      setGadgetNameError("Please input a gadget name.");
    } else if (value.trim().length < 3) {
      setGadgetNameError("Input at least 3 characters.");
    } else {
      setGadgetNameError("");
    }
  }

  function handleCategory(event) {
    const value = event.target.value;
    setCategoryType(value);
    if (value === "") {
      setCategoryTypeError("Choose a gadget category.");
    } else {
      setCategoryTypeError("");
    }
  }

  function handleManufacturer(event) {
    const value = event.target.value;
    setManufacturerName(value);
    if (value.trim() === "") {
      setManufacturerNameError("Please input a manufacturer.");
    } else {
      setManufacturerNameError("");
    }
  }

  function handleHealthRating(event) {
    const value = event.target.value;
    setHealthRate(value);
    if (value === "") {
      setHealthRateError("Please input a health rating.");
    } else if (Number(value) < 1 || Number(value) > 100) {
      setHealthRateError("Input a health rating from 1 to 100.");
    } else {
      setHealthRateError("");
    }
  }

  function handleTechBrand(event) {
    const value = event.target.value;
    setTechBrand(value);
    if (value.trim() === "") {
      setTechBrandError("Please input a tech brand.");
    } else {
      setTechBrandError("");
    }
  }

  function handleRole(event) {
    setRole(event.target.value);
    setRoleError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    let formIsValid = true;

    if (gadgetName.trim() === "") {
      setGadgetNameError("Please input a gadget name.");
      formIsValid = false;
    } else if (gadgetName.trim().length < 3) {
      setGadgetNameError("Input at least 3 characters for the gadget name.");
      formIsValid = false;
    }

    if (categoryType === "") {
      setCategoryTypeError("Choose a gadget category.");
      formIsValid = false;
    }

    if (manufacturerName.trim() === "") {
      setManufacturerNameError("Please input a manufacturer.");
      formIsValid = false;
    }

    if (healthRate === "") {
      setHealthRateError("Please input a health rating.");
      formIsValid = false;
    } else if (Number(healthRate) < 1 || Number(healthRate) > 100) {
      setHealthRateError("Input a health rating from 1 to 100.");
      formIsValid = false;
    }

    if (techBrand.trim() === "") {
      setTechBrandError("Please input a tech brand.");
      formIsValid = false;
    }

    if (role === "") {
      setRoleError("Select Engineer or Tester.");
      formIsValid = false;
    }

    if (formIsValid === true) {
      const newGadget = {
        id: Date.now(),
        gadgetName: gadgetName,
        categoryType: categoryType,
        manufacturerName: manufacturerName,
        healthRate: healthRate,
        techBrand: techBrand,
        role: role,
      };

      setGadgets([...gadgets, newGadget]);
      setChosenGadget(newGadget);
      setShowTable(true);

      setGadgetName("");
      setCategoryType("");
      setManufacturerName("");
      setHealthRate("");
      setTechBrand("");
      setRole("");
    }
  }

  return (
    <div className={styles.container}>
      {showTable === false ? (
        <div className={styles.formCard}>
          <h1>Tech Gadget Inventory Hub</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <label>Gadget Name</label>
              <input type="text" value={gadgetName} onChange={handleGadgetName} placeholder="Gadget name"/>
              {gadgetNameError && <span className={styles.fieldError}>{gadgetNameError}</span>}
            </div>

            <div className={styles.fieldRow}>
              <label>Category</label>
              <select value={categoryType} onChange={handleCategory}>
                <option value="">Select a category</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Wearable">Wearable</option>
                <option value="Audio">Audio</option>
              </select>
              {categoryTypeError && <span className={styles.fieldError}>{categoryTypeError}</span>}
            </div>

            <div className={styles.fieldRow}>
              <label>Manufacturer</label>
              <input type="text" value={manufacturerName} onChange={handleManufacturer} placeholder="Manufacturer name" />
              {manufacturerNameError && <span className={styles.fieldError}>{manufacturerNameError}</span>}
            </div>

            <div className={styles.fieldRow}>
              <label>Health Rating</label>
              <input type="number" value={healthRate} onChange={handleHealthRating} placeholder="Choose from 1 to 100" min="1" max="100" />
              {healthRateError && <span className={styles.fieldError}>{healthRateError}</span>}
            </div>

            <div className={styles.fieldRow}>
              <label>Tech Brand Name</label>
              <input type="text" value={techBrand} onChange={handleTechBrand} placeholder="Tech brand name" />
              {techBrandError && <span className={styles.fieldError}>{techBrandError}</span>}
            </div>

            <div className={styles.fieldRow}>
              <label>User Role</label>
              <div className={styles.roleRadios}>
                <label>
                  <input type="radio" name="role" value="Engineer" checked={role === "Engineer"} onChange={handleRole} />
                  Engineer
                </label>
                <label>
                  <input type="radio" name="role" value="Tester" checked={role === "Tester"} onChange={handleRole} />
                  Tester
                </label>
              </div>
              {roleError && <span className={styles.fieldError}>{roleError}</span>}
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      ) 
      : 
      (
        <div className={styles.tableCard}>
          <h1>Tech Gadget Inventory Hub</h1>

          <div className={styles.tableTop}>
            <button className={styles.backBtn} onClick={() => setShowTable(false)}>
              Back
            </button>
            <div>
              <h2>Gadget Registry</h2>
              <p>Total gadgets: {gadgets.length}</p>
            </div>
          </div>

          <div className={styles.roleFilterBox}>
            <label>Filter by Role</label>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="All">All</option>
              <option value="Engineer">Engineer</option>
              <option value="Tester">Tester</option>
            </select>
          </div>

          <div className={styles.tableScroll}>
            <table>
              <thead>
                {table.getHeaderGroups().map(function (headerGroup) {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(function (header) {
                        return (
                          <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>

              <tbody>
                {table.getRowModel().rows.map(function (row) {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setChosenGadget(row.original)}
                      className={chosenGadget !== null && chosenGadget.id === row.original.id ? styles.selectedRow : ""}
                    >
                      {row.getAllCells().map(function (cell) {
                        return (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.pagerRow}>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </button>

            <span>
              Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
            </span>

            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </button>
          </div>

          {actGadget !== null && (
            <div className={styles.detailsBox}>
              <div className={styles.detailsTop}>
                <h2>Active Detail Card</h2>
                <span className={styles.roleChip}>{actGadget.role}</span>
              </div>

              <div className={styles.detailsGrid}>
                <p>
                  <strong>Gadget Name:</strong> {actGadget.gadgetName}
                </p>
                <p>
                  <strong>Category:</strong> {actGadget.categoryType}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {actGadget.manufacturerName}
                </p>
                <p>
                  <strong>Health Rating:</strong> {actGadget.healthRate}
                </p>
                <p>
                  <strong>Tech Brand:</strong> {actGadget.techBrand}
                </p>
                <p>
                  <strong>User Role:</strong> {actGadget.role}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div> );
}export default App;
