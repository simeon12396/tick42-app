import { AnyAction, Dispatch } from "redux";
import { httpService } from "../../../services/httpService";
import * as projects from "../../types/projects/projectsTypes";

interface IProject {
  id: string;
  name: string;
  department: string;
  employeesId: string[];
  companyId: string;
}

interface IUpdateProject {
  id: string;
  name: string;
}

interface IUpdateProjectEmployees {
  employeesId: string[];
  projectId: string;
}

interface INewEmployee {
  projectId: string;
  newEmployeeId: string;
}

interface IUpdateProjects {
  companyId: string;
  unremovedCompanyProjects: IProject[];
}

const setProjects = (payload: IProject[]) => ({
  type: projects.SET_PROJECTS,
  payload,
});

const updateProjectname = (payload: IUpdateProject) => ({
  type: projects.UPDATE_PROJECT_NAME,
  payload,
});

const updateProjectEmployees = (payload: IUpdateProjectEmployees) => ({
  type: projects.UPDATE_PROJECT_EMPLOYEES,
  payload,
});

const updateProjects = (payload: IUpdateProjects) => ({
  type: projects.UPDATE_PROJECTS,
  payload,
});

export const assignNewEmployee = (payload: INewEmployee) => ({
  type: projects.ASSIGN_NEW_EMPLOYEE,
  payload,
});

const fetchProjects = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const response = await httpService("get", "projects");
    dispatch(setProjects(response));
  };
};

export type { IProject, IUpdateProject, IUpdateProjects, IUpdateProjectEmployees, INewEmployee };

export { fetchProjects, setProjects, updateProjectname, updateProjectEmployees, updateProjects };
