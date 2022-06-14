import type { NextPage } from "next";

import { useTask } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading } = useTask(taskId);

  return (
    <div className="page">
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {task && (
        <>
          <h1>
            {zeroPad(task?.id ?? 0)} - {task?.name}
          </h1>
          <p>{task?.description}</p>
          <p>initial_date {task?.initial_date}</p>
          <p>final_date {task?.final_date}</p>
          <p>estimated_hours {task?.estimated_hours}</p>
        </>
      )}
    </div>
  );
};

export default Task;
