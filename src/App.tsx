import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { ProjectPage } from "./components/ProjectPage/ProjectPage";
import { SelectProjectPage } from "./components/SelectProjectPage/SelectProjectPage";
import './global.scss'
import './transitionClasses.scss'

function App() {

  return (
    <BrowserRouter>
      <Switch>

        <Route path="/projects/newProject">
          <ProjectPage />
        </Route>

        <Route path="/projects">
          <SelectProjectPage />
        </Route>

        <Route path="/">
          <Redirect to={'/projects'} />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App
