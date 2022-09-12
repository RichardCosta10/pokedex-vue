import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import ListView from "@/views/ListView.vue";
import PaginatedListView from "@/views/PaginatedListView.vue";

//describe("HelloWorld.vue", () => {
// it("renders props.msg when passed", () => {
//   const msg = "new message";
//   const wrapper = shallowMount(HelloWorld, {
//     propsData: { msg },
//   });
//   expect(wrapper.text()).toMatch(msg);
// });

describe("PaginatedListView.vue", () => {
  it("should disable the 'previous' button", async () => {
    const wrapper = shallowMount(PaginatedListView, {
      propsData: { favourites: [], pokemonData: [], offset: 0 },
    });
    // @ts-ignore
    const button = wrapper.findComponent("#prev-btn");
    expect(button.attributes().disabled).toBeDefined();
  });

  it("should disable the 'next' button", async () => {
    const wrapper = shallowMount(PaginatedListView, {
      propsData: { favourites: [], pokemonData: [], offset: 1140 },
    });
    const button = wrapper.find("#next-btn");
    expect(button.attributes().disabled).toBeDefined();
  });
});
