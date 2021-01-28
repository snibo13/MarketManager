const e = React.createElement;

class Fund extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.data = "";
  }

  componentDidMount() {
    this.getFund();
  }

  getFund = async () => {
    const id = location.pathname.search(new RegExp("\d+"));
    
    const response = await fetch(`localhost:1111/api/fund/${id}`);
    const unParsed = await response.json();
    data = JSON.parse(unParsed);
  }
  render() {
    
    let returns = data.returns;
    let rar = data.riskAdjustedReturns;
    let perc = data.distributionPercentages;
    
    return (
      <div class="fund">
        <div class="card">
          <h1> {data.fundType} </h1>
          <h2> {data.fundManager} </h2>
        </div>
        <div class="card">

        
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
      </div>
    )
  }
}

const dom = document.querySelector('#root');
ReactDOM.render(e(Fund), dom);