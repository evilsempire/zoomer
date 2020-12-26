import 'antd/dist/antd.css'
import './App.css';
import { Row, Col } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TokenScreen from "./components/TokenScreen";
import Meeting from "./components/Meeting";

function App() {
  return (
    <Router>
      <Row>

        <Switch>
          <Route exact path="/">
            <Col span={6} offset={9}>
              <TokenScreen />
            </Col>
          </Route>

          <Route path="/dashboard">
            <Col span={6} offset={9}>
              <TokenScreen />
            </Col>
          </Route>

          <Route path="/meetings">
            <Col span={20} offset={2}>
              <Meeting />
            </Col>
          </Route>

        </Switch>
      </Row>
    </Router>
  );
}

export default App;
