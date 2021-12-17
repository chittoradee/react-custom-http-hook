import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
	const httpData = useHttp();
	const { isLoading, error, setRequest: sendTaskRequest } = httpData;
	const createTaskData = (taskText, taskData) => {
		console.log(taskData);
		const generatedId = taskData.name;
		const createdTask = { id: generatedId, text: taskText };
		props.onAddTask(createdTask);
	};
	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: "https://react-http-c08e2-default-rtdb.firebaseio.com/tasks.json",
				method: "POST",
				body: { text: taskText },
				headers: { "Content-Type": "application/json" },
			},
			createTaskData.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
