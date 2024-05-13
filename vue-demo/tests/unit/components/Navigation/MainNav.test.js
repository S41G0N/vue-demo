import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  it("Displays company name", () => {
    renderMainNav();
    screen.debug();
    const companyName = screen.getByText("Brickie");
    expect(companyName).toBeInTheDocument();
  });

  it("Displays items of the main navigation bar", () => {
    renderMainNav();
    screen.debug();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuText = navMenuItems.map((item) => item.textContent);
    console.log(navMenuText);
    expect(navMenuText).toEqual([
      "Teams",
      "Locations",
      "About us",
      "How we hire",
      "Students",
      "Jobs"
    ]);
  });
  describe("When user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      let profileImageCheck = screen.queryByRole("img", {
        name: /User profile image/i
      });
      expect(profileImageCheck).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i
      });
      await userEvent.click(loginButton);

      profileImageCheck = screen.queryByRole("img", {
        name: /User profile image/i
      });
      expect(profileImageCheck).toBeInTheDocument();
    });
  });
});
