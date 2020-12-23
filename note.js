// import()
/*********************************************/

//before

import { add } from "./math";
cosole.log(add(16, 26));

//after

import('./math').then(math => console.log(math.add(16, 26)));

// React.lazy()
/*********************************************/

//before
import IGComponent from "./IGComponent";

//after
const IGComponent = React.lazy(()=> import("./IGComponent"));

// Suspense & Error Boundaries
/*********************************************/

import React, { Suspense } from "react";
import MyErroBoundary from "./MyErrorBoundary";

const IGComponent = React.lazy(()=> import("./IGComponent"));
const YTComponent = React.lazy(()=> import("./YTComponent"));

const MyComponent = () => {
  render(
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading..</div>}>
        <Section>
          <IGComponent />
          <YTComponent />
        </Section>
      </Suspense>
    </MyErrorBoundary>
  )
}

// Route-based code splitting
/*********************************************/
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = lazy(()=> import("./routes/Home"));
const About = lazy(()=> import("./routes/About"));
const Contact = lazy(()=> import("./routes/Contact"));

const App = () => {
  render (
    <Router>
      <Suspense  fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </Suspense>
    </Router>
  )
}