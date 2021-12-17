import { useState,useCallback } from "react";
const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const setRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});
			if (!response.ok) {
				setError("Something went wrong!");
			}
			const data = await response.json();
			applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	},[]);
	return {
		isLoading,
		error,
		setRequest,
	};
};
export default useHttp;
