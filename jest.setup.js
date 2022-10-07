import "@testing-library/jest-dom/extend-expect";
import { mswServer } from "./mocks/mswServer";

//** Conditions for mocking API requests **/
beforeEach(() => {
  mswServer.listen();
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
//*****************************************/
