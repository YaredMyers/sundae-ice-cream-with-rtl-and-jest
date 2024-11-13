import "@testing-library/jest-dom";

import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./mocks/server.js";

// establishing API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
//clean up after the tests are finished
afterAll(() => server.close());
