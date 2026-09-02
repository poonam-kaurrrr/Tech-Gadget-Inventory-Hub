import { useState } from "react";
import styles from "./App.module.css";

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
      <div className={styles.formCard}>
        <h1>Tech Gadget Inventory Hub</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <label>Gadget Name</label>
            <input type="text" value={gadgetName} onChange={handleGadgetName} placeholder="Gadget name" />
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
        <p>{gadgets.length} gadget(s) saved.</p>
      </div>
    </div>
  );
}

export default App;
