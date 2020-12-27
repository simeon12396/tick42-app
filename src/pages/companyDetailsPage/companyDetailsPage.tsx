import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { ICompanyAddress } from "../../store/actions/companyAddresses/companyAddressesActions";
import { IProject, updateProjects } from "../../store/actions/projects/projectsActions";
import { TRootState } from "../../store/reducers";
import CancelIcon from "@material-ui/icons/Cancel";
import CustomFabButton from "../../components/customFabButton/customFabButton";
import AddIcon from "@material-ui/icons/Add";

type TRouteParams = {
  id: string;
};

const CompanyDetailsPage = (): JSX.Element => {
  const styles = useStyles();
  const { id } = useParams<TRouteParams>();
  const dispatch = useDispatch();
  const companiesSelector = useSelector((state: TRootState) => state.companiesReducer.rawData);
  const projectsSelector = useSelector((state: TRootState) => state.projectsReducer.rawData);
  const companyAddressesSelector = useSelector((state: TRootState) => state.companyAddressesReducer.rawData);

  const [companyProjects, setCompanyProjects] = useState<IProject[] | []>([]);
  const foundCompany = companyAddressesSelector.find((c: ICompanyAddress) => c.companyId === id);
  const { companyId } = foundCompany;

  const removeProject = (id: string) => {
    const unremovedCompanyProjects = companyProjects.filter((p: IProject) => p.id !== id);
    setCompanyProjects(unremovedCompanyProjects);
    dispatch(updateProjects({ companyId, unremovedCompanyProjects }));
  };

  useEffect(() => {
    const foundCompanyProjects = projectsSelector.filter((c: IProject) => c.companyId === id);
    setCompanyProjects(foundCompanyProjects);
  }, [companyId]);

  if (!companiesSelector || !projectsSelector || !companyAddressesSelector) {
    return <Typography variant="body1">Loading....</Typography>;
  }

  return (
    <div className={styles.companyContainer}>
      <Typography variant="h5">Company address details:</Typography>

      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.projectLabel}>
          City:
        </Typography>
        <Typography variant="body2">{foundCompany.city}</Typography>
      </div>

      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.projectLabel}>
          Country:
        </Typography>
        <Typography variant="body2">{foundCompany.country}</Typography>
      </div>

      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.projectLabel}>
          Street:
        </Typography>
        <Typography variant="body2">{foundCompany.street}</Typography>
      </div>

      <div className={styles.flexbox}>
        <Typography variant="body1" className={styles.projectLabel}>
          State:
        </Typography>
        <Typography variant="body2">{foundCompany.state}</Typography>
      </div>

      <Typography variant="h5">Company projects: </Typography>

      <div>
        {companyProjects.length === 0 && (
          <Typography variant="body2" color="error">
            Attention! The company doesn't contain any projects!
          </Typography>
        )}

        {companyProjects.map((p: IProject) => (
          <div key={p.id} className={styles.flexbox}>
            <Typography variant="body1" className={styles.projectLabel}>
              Name:
            </Typography>
            <NavLink to={`/project-details/${p.id}`} className={styles.projectValue}>
              {p.name}
            </NavLink>
            <CancelIcon onClick={() => removeProject(p.id)} className={styles.cancelIcon} />
          </div>
        ))}
      </div>

      <CustomFabButton children={<AddIcon />} color="primary" className={styles.plusButton} />
    </div>
  );
};

export default CompanyDetailsPage;

const useStyles = makeStyles((theme) => ({
  companyContainer: {
    display: "flex",
    flexDirection: "column",
  },
  flexbox: {
    display: "flex",
    alignItems: "center",
  },
  projectLabel: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  projectValue: {
    display: "block",
    textDecoration: "none",
    color: theme.palette.primary.dark,
    opacity: 0.8,
    transition: "all linear .1s",

    "&:hover": {
      opacity: 1,
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
  cancelIcon: {
    fill: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
  },
  plusButton: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));
