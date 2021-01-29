import { history } from "../..";

export const RedirectTo = (location: any) => {
  const { from } = (location?.state as any) || { from: { pathname: "/" } };
  history.replace(from);
};
