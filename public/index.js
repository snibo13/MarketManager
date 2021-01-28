'use strict';

const e = React.createElement;

class Test extends React.Component{
  render ()
  {
    return (
      <div class="card">
        <h1>Header 1 </h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <p>Paragraph</p>
      </div>
      
    );
  }
}

const domContainer = document.querySelector('body');
ReactDOM.render(e(Test), domContainer);