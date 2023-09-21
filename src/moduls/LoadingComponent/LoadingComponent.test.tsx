import { render } from "@testing-library/react";
import LoadingComponent from "./LoadingComponent";

test("LoadingComponent отображается корректно", () => {
  const { container } = render(<LoadingComponent />);

  const loaderBoxElement = container.querySelector(".loaderBox");
  expect(loaderBoxElement).toBeTruthy();

  const loaderElement = container.querySelector(".loader");
  expect(loaderElement).toBeTruthy();
});
