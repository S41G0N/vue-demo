import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import TextInput from "@/components/Shared/TextInput.vue";

describe("Text Input", () => {
  it("communicates that user entered character", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: ""
      }
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Ams");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["A"], ["Am"], ["Ams"]]);
  });
});
