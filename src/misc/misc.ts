type TRequest = "get" | "post" | "put" | "patch" | "delete";

type TEndPoint = "companies" | "company-addresses" | "employees" | "projects";

type TVariant = "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly" | undefined;

type TButton = "button" | "submit" | "reset";

export type { TRequest, TEndPoint, TVariant, TButton };
