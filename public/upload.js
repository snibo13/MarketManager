class Upload extends React.Component {
  upload()
  {
    const res = await fetch(
      'localhost:1111/api/fund',
      {
        method: 'POST',
        body: {
          "fundName":$('#name').value,
          "fundManager": $('#manager').value,
          "fundType":$('#type').value
        },
        headers: {'Content-Type':'application/json'}
      }
    );
    
    if (res != null && $('#data').value != null)
    {
      const dataFile = await fetch(
        `localhost:1111/api/fund/${res.id}/prices`,
        {
          method: 'POST',
          body: {
            "files": $("data").value
          },
          headers: {'Content-Type':'application/json'}
        }
      );  
    }

    window.location.href = window.location.hostname + `/fund/${res.id}`;

    
  }
  render()
  {
    <div>
      <input id="manager" type="text" placeholder="Fund Manager"></input>
      <input id="name" type="text" placeholder="Fund Name"></input>
      <select id="type">
        <option value="Equity">Equity</option>
        <option value="Balanced">Balanced</option>
        <option value="Fixed Value">Fixed Value</option>
        <option value="Money Market">Money Market</option>
        <option value="Other">Other</option>
      </select>
      <input id="data" type="file"></input>
      <button id="submit" onclick="upload()"></button>
    </div>
  }
}

const e = React.createElement;
const domContainer = document.querySelector("#root");
ReactDOM.render(e(Upload), domContainer);