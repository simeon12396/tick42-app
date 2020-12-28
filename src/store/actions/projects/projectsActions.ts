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

interface IRemoveProjects {
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

const removeProjects = (payload: IRemoveProjects) => ({
  type: projects.REMOVE_PROJECTS,
  payload,
});

const addNewProject = (payload: IProject) => ({
  type: projects.ADD_NEW_PROJECT,
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

export type { IProject, IUpdateProject, IRemoveProjects, IUpdateProjectEmployees, INewEmployee };

export { fetchProjects, setProjects, updateProjectname, updateProjectEmployees, removeProjects, addNewProject };
