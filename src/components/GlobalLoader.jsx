import { useLoader } from "../context/LoaderContext";
import { ClipLoader } from "react-spinners";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <ClipLoader size={50} color="#82C600" />
    </div>
  );
};

export default GlobalLoader;