import { AnyAction } from "redux";
import { INewEmployee, IProject, IUpdateProject, IUpdateProjectEmployees, IUpdateProjects } from "../../actions/projects/projectsActions";
import * as projects from "../../types/projects/projectsTypes";

type TState = {
  rawData: IProject[] | null;
};

const initialState: TState = {
  rawData: null,
};

const updateProjectName = (projects: IProject[], payload: IUpdateProject) => {
  const foundProject = projects.find((p) => p.id === payload.id);
  const otherProjects = projects.filter((p) => p.id !== payload.id);
  const hasDifferentName = foundProject && payload.name === foundProject.name ? foundProject.name : payload.name;

  return [...otherProjects, { ...foundProject, name: hasDifferentName }];
};

const updateProjectEmployees = (projects: IProject[], payload: IUpdateProjectEmployees) => {
  const foundProject = projects.find((p) => p.id === payload.projectId);
  const otherProjects = projects.filter((p) => p.id !== payload.projectId);

  return [...otherProjects, { ...foundProject, employeesId: payload.employeesId }];
};

const assignNewEmployeeWithinTheProject = (projects: IProject[], payload: INewEmployee) => {
  const foundProject = projects.find((p) => p.id === payload.projectId);
  const otherProjects = projects.filter((p) => p.id !== payload.projectId);

  return foundProject ? [...otherProjects, { ...foundProject, employeesId: [...foundProject.employeesId, payload.newEmployeeId] }] : [];
};

const updateProjects = (projects: IProject[], payload: IUpdateProjects) => {
  const filteredProjects = projects.filter((p) => p.companyId !== payload.companyId);
  debugger;
  return [...filteredProjects, ...payload.unremovedCompanyProjects];
};

const projectsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case projects.SET_PROJECTS:
      return {
        ...state,
        rawData: payload,
      };
    case projects.UPDATE_PROJECT_NAME:
      return {
        ...state,
        rawData: updateProjectName(state.rawData ? state.rawData : [], payload),
      };
    case projects.UPDATE_PROJECT_EMPLOYEES:
      return {
        ...state,
        rawData: updateProjectEmployees(state.rawData ? state.rawData : [], payload),
      };
    case projects.ASSIGN_NEW_EMPLOYEE:
      return {
        ...state,
        rawData: assignNewEmployeeWithinTheProject(state.rawData ? state.rawData : [], payload),
      };
    case projects.UPDATE_PROJECTS:
      return {
        ...state,
        rawData: updateProjects(state.rawData ? state.rawData : [], payload),
      };
    default:
      return state;
  }
};

export { projectsReducer };
