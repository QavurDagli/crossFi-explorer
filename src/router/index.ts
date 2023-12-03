import { useBlockchain } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import { setupLayouts } from "virtual:generated-layouts";
// @ts-ignore
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
});

//update current blockchain
router.beforeEach((to) => {
    const { chain } = to.params
    if(chain){
      const blockchain = useBlockchain()
      const lowercaseChain = chain.toString().toLowerCase();
      if(lowercaseChain !== blockchain.chainName)
        blockchain.setCurrent(lowercaseChain)
    } 
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router;