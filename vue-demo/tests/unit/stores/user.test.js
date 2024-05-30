import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";

describe("Check default login status", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("checks whether the user starts 'logged out'", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });
});

describe("Login user", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("tries to login user by updating login status", () => {
    const store = useUserStore();
    store.loginUser();
    expect(store.isLoggedIn).toBe(true);
  });
});
