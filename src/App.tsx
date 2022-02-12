import classNames from "classnames/bind";
import { FC } from "react";
import styles from "./App.module.scss";
import useGestures from "./hooks/useGestures";
import Provider from "./Provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";

const cx = classNames.bind(styles);

const App: FC = () => {
  useGestures();

  return (
    <section className={cx("main")}>
      <Header />
      <Grid />
      <Footer />
    </section>
  );
};

const ConnectedApp: FC = () => (
  <Provider>
    <App />
  </Provider>
);

export default ConnectedApp;
