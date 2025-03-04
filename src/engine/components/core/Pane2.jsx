import './Pane2.css';

const Pane2 = {
  Body: (props) => (<div class='pane2'>{props.children}</div>),
  Left: (props) => (<div class='pane2-l'>{props.children}</div>),
  Right: (props) => (<div class='pane2-r'>{props.children}</div>)
};

export default Pane2;
