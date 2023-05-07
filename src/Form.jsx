import React from "react"

export default function Form() {
  const [selectedOption, setSelectedOption] = React.useState(null)
  const [rangeValue, setRangeValue] = React.useState(null)
  const [errorMessage, setErrorMessage] = React.useState(null)

  function handleSelectChange(event){
    setSelectedOption(event.target.value)
  }

  function handleRangeChange(event){
    setRangeValue(event.target.value)
  }

  React.useEffect(()=> {
    const form = document.getElementById("form");

    function handleSubmit(event) {
      event.preventDefault();
      const payload = new FormData(form);
      
      const jsonData = {};
      for(const [key, value] of payload.entries()) {
        jsonData[key] = value;
      }

      fetch("http://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => console.log(data.json))
      .catch(error => console.log(error));
    }
  
    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    }
  }, [])

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <form id="form">
        <label htmlFor="dishName">Name:</label>
        <input name="dishName" type="text" id="dishName" required/>
        <label htmlFor="prepTime">Preparation time:</label>
        <input name="prepTime" type="time" id="prepTime" step={1} required/>
        <label htmlFor="dishType">Type:</label>
        <select name="dishType" id="dishType" onChange={handleSelectChange} required>
          <option value="">Select option</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {selectedOption === "pizza" && (
          <>
            <label htmlFor="no_of_slices">Number of slices:</label>
            <input type="number" name="no_of_slices" id="no_of_slices" required/>
            <label htmlFor="diameter">Diameter</label>
            <input type="number" step={0.01} name="diameter" id="diameter" required/>
          </>
        )}
        {selectedOption === "soup" && (
          <>
            <label htmlFor="spiceness_scale">Spiceness scale: {rangeValue}</label>
            <input type="range" min={1} max={10} name="spiceness_scale" id="spiceness_scale" onChange={handleRangeChange} required/>
          </>
        )}
        {selectedOption === "sandwich" && (
          <>
            <label htmlFor="slices_of_bread">Number of slices of bread required:</label>
            <input type="number" name="slices_of_bread" id="slices_of_bread" required/>
          </>
        )}
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  )
}