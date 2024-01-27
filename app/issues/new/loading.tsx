import delay from "delay";
import "react-loading-skeleton/dist/skeleton.css";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const LoadingNewIssuePage = () => {
  delay(5000);

  return <IssueFormSkeleton />;
};

export default LoadingNewIssuePage;
