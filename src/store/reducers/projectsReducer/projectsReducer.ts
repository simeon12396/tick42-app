import { AnyAction } from "redux";
import { INewEmployee, IProject, IRemoveProjects, IUpdateProject, IUpdateProjectEmployees } from "../../actions/projects/projectsActions";
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
  const hasThatName = otherProjects.find((p) => p.name === payload.name);

  if (hasThatName) {
    return [...otherProjects, { ...foundProject }];
  }

  const hasDifferentName = foundProject && hasThatName && payload.name === foundProject.name ? foundProject.name : payload.name;

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

const removeProjects = (projects: IProject[], payload: IRemoveProjects) => {
  const filteredProjects = projects.filter((p) => p.companyId !== payload.companyId);
  return [...filteredProjects, ...payload.unremovedCompanyProjects];
};

const addNewProject = (projects: IProject[], payload: IProject) => {
  const hasProject = projects.find((p: IProject) => p.id === payload.id || p.name === payload.name);
  debugger;
  if (hasProject) {
    return projects;
  }

  return [...projects, payload];
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
    case projects.REMOVE_PROJECTS:
      return {
        ...state,
        rawData: removeProjects(state.rawData ? state.rawData : [], payload),
      };
    case projects.ADD_NEW_PROJECT:
      return {
        ...state,
        rawData: addNewProject(state.rawData ? state.rawData : [], payload),
      };
    default:
      return state;
  }
};

export { projectsReducer };
