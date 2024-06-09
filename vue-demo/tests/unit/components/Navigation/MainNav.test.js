import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import MainNav from "@/components/Navigation/MainNav.vue";
import { RouterLinkStub } from "@vue/test-utils";

import { useUserStore } from "@/stores/user";
import { createTestingPinia } from "@pinia/testing";

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia({ stubActions: true });
    const $route = { name: "Home" };
    render(MainNav, {
      global: {
        mocks: { $route: $route },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    });
  };
  it("Displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Brickie");
    expect(companyName).toBeInTheDocument();
  });

  it("Displays items of the main navigation bar", () => {
    renderMainNav();
    screen.debug();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuText = navMenuItems.map((item) => item.textContent);
    console.log(navMenuText);
    expect(navMenuText).toEqual(["Sets", "Minifigures", "Deals", "News", "Inventory", "About Us"]);
  });
  describe("When user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();
      let profileImageCheck = screen.queryByRole("img", {
        name: /User profile image/i
      });
      expect(profileImageCheck).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);

      profileImageCheck = screen.queryByRole("img", {
        name: /User profile image/i
      });
      expect(profileImageCheck).toBeInTheDocument();
    });
  });
});
