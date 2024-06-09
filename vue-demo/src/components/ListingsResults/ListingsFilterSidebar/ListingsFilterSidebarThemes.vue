<template>
  <collapsible-accordion header="Themes">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="Test" type="checkbox" class="mr-3" />
            <label for="Test">Test</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Test2" type="checkbox" class="mr-3" />
            <label for="Test2">Test2</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Test3" type="checkbox" class="mr-3" />
            <label for="Test3">Test3</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Test4" type="checkbox" class="mr-3" />
            <label for="Test4">Test4</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
export default {
  name: "ListingsFilterSidebarThemes",
  components: {
    CollapsibleAccordion
  },
  props: {}
};
</script>
