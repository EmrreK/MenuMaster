import {createContext, useState, useContext} from "react";

export const PlanContext = createContext();

export const PlanProvider = ({children}) => {
	const [selectedPlan, setSelectedPlan] = useState(null);

	return (
		<PlanContext.Provider value={{selectedPlan, setSelectedPlan}}>
			{children}
		</PlanContext.Provider>
	);
};
export const usePlan = () => useContext(PlanContext);
