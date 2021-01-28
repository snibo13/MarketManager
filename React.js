export class Price extends React.Component {
  render() {
  var data = this.props.json;
    return (
    <div class="price">
    <h1>{data.price}</h1>
    <h1>{data.date}</h1>
    </div>
    );
  }
}



export class SignUp extends React.Component {
  render()
  {
    <div id="up">
      <input id="name" type="text"></input>
      <input id="email" type="text"></input>
      <input id="password" type="password"></input>
      <input id="confirm" type="password"></input>
      <button id="submit"></button>
    </div>
  }
}

export class SignIn extends React.Component {
  render()
  {
    <div id="in">
      <input id="email" type="text"></input>
      <input id="password" type="password"></input>
    </div>
  }
}

export class Search extends React.Component {
  render()
  {
    <div>
      <input id="manager" type="text" placeholder="manager"></input>
      <button id="submit"></button>
    </div>

  }
}


export class Upload extends React.Component {
  render()
  {
    <div>
      <input id="name" type="text" placeholder="Fund Name"></input>
      <select id="type">
        <option value="Equity">Equity</option>
        <option value="Balanced">Balanced</option>
        <option value="Fixed Value">Fixed Value</option>
        <option value="Money Market">Money Market</option>
        <option value="Other">Other</option>
      </select>
      <input id="data" type="file"></input>
      <button id="submit"></button>
    </div>
  }
}

export class KV extends React.Component {
render() {
return (
	<div>
	  <h2>{this.props.k}</h2>
    <h3>{this.props.v}</h3>
	</div>
);
}
}

export class Fund extends React.Component {
  render() {
    var data = JSON.parse(this.props.json);
    let returns = data.returns;
    let rar = data.riskAdjustedReturns;
    let perc = data.distributionPercentages;
    
    return (
      <div class="fund">
        <h1> {data.fundType} </h1>
        <h2> {data.fundManager} </h2>
        <h2> Returns </h2>
        <ul id="ret">
          {Object.keys(returns).map((data, key) => <KV k={data} v={returns[data]} />)}
         </ul>
         <h2>Risk Adjusted Returns</h2>
         <ul id="rar">
           {Object.keys(rar).map((data, key) => <KV k={data} v={rar[data]} />)}
         </ul>
         <h2>Prices</h2>
        <div>
          {(data.prices).map((data, key) => <KV k={data.price}  v={data.date}/>)}
        </div>
        <h2>Percentages</h2>
        <div id="perc">
          {Object.keys(perc).map((data, key) => <KV k={data} v={perc[data]} />)}
        </div>
      </div>
    )
  }
}