import { useContext } from "react";
import { GridContext } from "./context";

const useGrid = () => {
  return useContext(GridContext);
};

export default useGrid;
