import { useQuery } from "react-query";
import agent from "../../api/agent";
import { ME } from "../../utils/constants";

const useMe = () => {
  const { isSuccess, data, isError, error } = useQuery(ME, agent.User.me, { refetchInterval: false });

  if (isError) {
    console.log("ME error", error);
  }

  return { isSuccess, data };
}

export default useMe;